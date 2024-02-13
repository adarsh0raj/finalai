import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const MicWrapper = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <Box
            w={"100%"}
            h={"90vh"}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            bg={"white"}
        >
            <Box><Text fontSize={"xl"}>Microphone: {listening ? 'on' : 'off'}</Text></Box>
            <Flex direction={"row"} gap={4} m={3}>
                <Button onClick={SpeechRecognition.startListening}>Start</Button>
                <Button onClick={SpeechRecognition.stopListening}>Stop</Button>
            </Flex>
            <Box><Button onClick={resetTranscript}>Reset</Button></Box>
            <Box><Text>{transcript}</Text></Box>
        </Box>
    );
}

export default MicWrapper;