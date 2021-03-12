const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { process400, process500, processData, process401 } = require("../utils/ResponseUtils");
const verifyRequest = require("../utils/VerifyRequest")


const users = [
    {   
        name: "USER 1",
        email: "user1@gmail.com",
        password: "$2a$10$TXZ/./shXQngaK3dlZC5TOhk9IluqaS6cguCfsQi6STBpjeRyl7Eq"
    }
]

const questions = [
    {
        title: "Why is processing a sorted array faster than processing an unsorted array?",
        content: [{
            type: "text",
            content: `I've been messing around with JSON for some time, just pushing it out as text and it hasn't hurt anybody (that I know of), but I'd like to start doing things properly.`,
        },
        {
            type: "text",
            content: `I have seen so many purported "standards" for the JSON content type:`,
        },
        {
            type: "code",
            content: `
            #include <algorithm>
            #include <ctime>
            #include <iostream>
            
            int main()
            {
                // Generate data
                const unsigned arraySize = 32768;
                int data[arraySize];
            
                for (unsigned c = 0; c < arraySize; ++c)
                    data[c] = std::rand() % 256;
            
                // !!! With this, the next loop runs faster.
                std::sort(data, data + arraySize);
            
                // Test
                clock_t start = clock();
                long long sum = 0;
            
                for (unsigned i = 0; i < 100000; ++i)
                {
                    // Primary loop
                    for (unsigned c = 0; c < arraySize; ++c)
                    {
                        if (data[c] >= 128)
                            sum += data[c];
                    }
                }
            
                double elapsedTime = static_cast<double>(clock() - start) / CLOCKS_PER_SEC;
            
                std::cout << elapsedTime << std::endl;
                std::cout << "sum = " << sum << std::endl;
            }    `,
        },
        {
            type: "list",
            content: [`Without std::sort(data, data + arraySize);, the code runs in 11.54 seconds.`, `With the sorted data, the code runs in 1.93 seconds.` ],
        },
        {
            type: "text",
            content: `Initially, I thought this might be just a language or compiler anomaly, so I tried Java:`,
        },
        {
            type: "code",
            content: `import java.util.Arrays;
            import java.util.Random;
            
            public class Main
            {
                public static void main(String[] args)
                {
                    // Generate data
                    int arraySize = 32768;
                    int data[] = new int[arraySize];
            
                    Random rnd = new Random(0);
                    for (int c = 0; c < arraySize; ++c)
                    data[c] = rnd.nextInt() % 256;
            
                    // !!! With this, the next loop runs faster
                    Arrays.sort(data);
            
                    // Test
                    long start = System.nanoTime();
                    long sum = 0;
            
                    for (int i = 0; i < 100000; ++i)
                    {
                        // Primary loop
                        for (int c = 0; c < arraySize; ++c)
                        {
                            if (data[c] >= 128)
                                sum += data[c];
                        }
                    }
            
                    System.out.println((System.nanoTime() - start) / 1000000000.0);
                    System.out.println("sum = " + sum);
                }
            }`,
        },
        {
            type: "text",
            content: `With a similar but less extreme result.            `,
        },
        {
            type: "text",
            content: `My first thought was that sorting brings the data into the cache, but then I thought how silly that was because the array was just generated.`,
        },
        {
            type: "list",
            content: [`What is going on?`, `Why is processing a sorted array faster than processing an unsorted array?` ],
        },
        {
            type: "text",
            content: `The code is summing up some independent terms, so the order should not matter.`,
        },



    ],
        tags: ["java","c++","performance","optimization","branch-prediction"],
        asked: "8 years 8 months ago",
        active : "1 month",
        views : "1.6 M",
        upvotes: 2008,
        answers: [{
            time: new Date ("Fri Mar 12 2021 04:03:20 GMT+0530 (India Standard Time)"),
            upvotes: 234,
            content: [
                {
                    type: "text",
                    content: `Branch prediction.`,
                },
                {
                    type: "text",
                    content: `With a sorted array, the condition data[c] >= 128 is first false for a streak of values, then becomes true for all later values. That's easy to predict. With an unsorted array, you pay for the branching cost.`,
                },
        ]

        }]

    }
]


const secret = "e2af6c9bccc5ecdd6b56dd1bfe0171894ba66357b1079c9b3dead6575f291a2287703d70358018f1e5624378c669c8d390bad03692d2f832090069d73e558590"


//Login Route
exports.login = async (req, res) => {
    console.log(req.body, "req.body")
	const password  = req.body.password;
	const email= req.body.email;

	try {
		const user =  users.find(user => user.email === email)
        console.log(user)

		if (!user) {
			process400(res, "No user was found with the given email.");
			return;
		}
        console.log(password, user.password)

		const passwordCorrect = await bcrypt.compare(password, user.password);

		if (passwordCorrect) {
			const { name , email} = user;
			

			const authToken = jwt.sign({ name,  email }, secret);
			res.cookie("USER", email, {
				// secure: isProduction,
			});
		
			res.cookie("AUTH_TOKEN", authToken, {
				// secure: isProduction,
				// httpOnly: true,
			});
			processData(res, { email, name });
		} else {
			process401(res, "The password is incorrect.", "password_wrong");
		}
	} catch (error) {
		process500(res, "An error occured", error.message);
		console.log(error);
	}
};


exports.logout = async (req, res) => {
	try {
		verifyRequest(req, "AUTH_TOKEN", secret);
		res.clearCookie("USER");
		res.clearCookie("AUTH_TOKEN");
		processData(res, "Logged Out");
	} catch (error) {
		if (error.code === 9090) {
			process400(res, "Unauthorized Request");
		} else {
			logger.error(error);
			process500(res, "An error occured.");
		}
	}
};

exports.getDetails = async (req, res) => {
	try {
        verifyRequest(req, "AUTH_TOKEN", secret);
		const { email } = verifyRequest(req, "AUTH_TOKEN", secret);
		const user = await users.find(user => user.email === email)
		const { password, creationTime, lastUpdated, ...leanUser } = user

		processData(res, leanUser);
	} catch (error) {
		console.log(error);
	}
};

exports.getQuestion = async (req, res) => {

    try {
       
        verifyRequest(req, "AUTH_TOKEN", secret);
        const title = req.query.title.replace(/-/g, " ");
        console.log(title)
       
        const question =  questions.find(question => question.title.toLowerCase() === title)
        console.log(question)

		if (!question) {
			process400(res, "No such question found");
			return;
		}
        else {
            processData(res, question)
        }

		

		
	} catch (error) {
		process500(res, "An error occured", error.message);
		console.log(error);
	}

}