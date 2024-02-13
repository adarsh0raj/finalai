import React, { useState, useRef, useEffect } from "react";
import MicWrapper from "./components/micwrapper";
import AiBot from "./components/aibot";
import {Box, Button, Center, Flex, useMediaQuery, Heading, Divider} from "@chakra-ui/react";
import { Camera } from "react-camera-pro";

const Home = () => {

  const camera = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [mobileScreen] = useMediaQuery('(min-width: 600px)');
  const [ratio, setRatio] = useState(9 / 16);
  const [numberOfCameras, setNumberOfCameras] = useState(0);

  useEffect(()=>{
    if(mobileScreen){
      setRatio(9/16);
    }
    else{
      setRatio("cover");
    }
  }, [mobileScreen, ratio])

  return (
    <Flex width={"100vw"} height={"100vh"} direction={"column"}>
      <Heading textAlign={"center"} size={"xl"} p={4}>
        Final AI
      </Heading>
      <Divider orientation='horizontal' size={"5px"} color={"gray"} />
      <Flex direction={"row"} align={"center"}>
        <Flex w={"40%"} height={"100%"} direction={"column"} justifyContent={"center"} alignItems={"center"} overflow={"hidden"}>
          <Button zIndex={100} bg={"#f0f0f0"} onClick={() => setCameraOn(!cameraOn)}>Toggle Camera</Button>
          {cameraOn && (
            <Box h='100vh' w='50vw'>
              <Center>
                <Camera className="cameraClass" ref={camera} numberOfCamerasCallback={setNumberOfCameras} facingMode="user" aspectRatio="cover"/>
              </Center>
            </Box>
          )}
        </Flex>
        <Flex w={"30%"} bg={"#f0f0f0"} justifyContent={"center"} alignItems={"center"}>
          <MicWrapper />
        </Flex>
        <Flex w={"30%"} bg={"#f0f0f0"} justifyContent={"center"} alignItems={"center"}>
          <AiBot />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Home;