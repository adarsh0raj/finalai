import React from 'react';
import { Box, Button, Center, Flex, Heading, Divider } from "@chakra-ui/react";

const AiBot = () => {
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState("");
    const [messageStatus, setMessageStatus] = React.useState("idle"); // idle, pending, rejected

    const getResponse = async (input) => {
        // add a dummy promise which resolves after 3 second instead of the fetch call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ userMessage: input, message: "Hola amigos! Su chee!" });
            }, 3000);
        });

        // const response = await fetch("http://localhost:5000/chat", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ message: input }),
        // });
    };

    const onSendClick = () => {
        setMessageStatus("pending");
        getResponse(input)
            .then((data) => {
                setMessages([...messages, data]);
                setInput("");
                setMessageStatus("idle");
            })
            .catch((error) => {
                console.error(error);
                setMessageStatus("rejected");
            });
    }

    React.useEffect(() => {
        if (messageStatus === "rejected") {
            setTimeout(() => {
                setMessageStatus("idle");
            }, 1000);
        }
    }, [messageStatus]);

    return (
        <Flex
            w={"100%"}
            h={"90vh"}
            direction="column"
            align="center"
            p={4}
        >
            <Flex w={"100%"} direction="row" paddingLeft={"5"} paddingRight={"5"} justifyContent="space-between">
                <Heading size={"md"} mb={4}>
                    AI Bot
                </Heading>
                <Button
                    size={"sm"}
                    onClick={() => {
                        setMessages([]);
                        setInput("");
                        setMessageStatus("idle");
                    }}
                    colorScheme="red"
                    variant="outline"
                >
                    Clear Chat
                </Button>
            </Flex>
            <Divider m={2} orientation='horizontal' borderColor={"black"} opacity={0.6} />
            <Box
                w={"100%"}
                h={"100%"}
                overflowY="auto"
            >
                {messages.map((message, index) => (
                    <Box
                        key={index} mb={4} bg="white"
                        borderRadius={8}
                        overflowY="auto"
                        border="1px solid"
                        borderColor="gray.200"
                        p={3}
                    >
                        <Box fontWeight="bold">{message.userMessage}</Box>
                        <Box>{message.message}</Box>
                    </Box>
                ))}
                {messageStatus === "pending" && (
                    <Box
                        mb={4} bg="white"
                        borderRadius={8}
                        overflowY="auto"
                        border="1px solid"
                        borderColor="gray.200"
                        p={3}
                    >
                        <Box fontWeight="bold">{input}</Box>
                        <Box>...</Box>
                    </Box>
                )}
                {messageStatus === "rejected" && "Failed to send message. Please try again later."}
            </Box>
            <Flex w="100%" mt={3}>
                <Box w="100%">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        style={{ width: "100%", padding: "10px" }}
                    />
                </Box>
                <Box ml={2}>
                    <Button onClick={onSendClick} isLoading={messageStatus === "pending"}>
                        Send
                    </Button>
                </Box>
            </Flex>
        </Flex>
    )
}

export default AiBot;