import {
    Box,
    Card,
    Center,
    Spinner,
    IconButton,
    Breadcrumb,
    Text,
    Icon,
    Heading,
} from "@chakra-ui/react";
import { useCallback, useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { LuDownload, LuHouse } from "react-icons/lu";
import { CiWarning } from "react-icons/ci";
import { useParams } from "react-router-dom";
import getResultByRequestId from "~/api/result/getResultByRequestId";
import { AnimationBox } from "~/common/AnimationBox";
const ResultPage = () => {
    const requestId = useParams().requestId;
    const [content, setContent] = useState<Blob>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDownload, setIsDownload] = useState<boolean>(false);
    const [retryFlag, setRetryFlag] = useState<boolean>(false);
    const Init = useCallback(async () => {
        try {
            setIsLoading(true);
            if (requestId) {
                let result: Blob;
                let status: string;
                [result, status] = await getResultByRequestId(requestId);
                const MAX_RETRIES = 2;
                let retryCount = 0;
                const checkStatus = async () => {
                    if (retryCount > MAX_RETRIES) {
                        setRetryFlag(true);
                        return;
                    }
                    if (status === "running") {
                        [result, status] = await getResultByRequestId(
                            requestId
                        );
                        setContent(result);
                        retryCount++;
                        setTimeout(checkStatus, 3000);
                    } else if (status === "done") {
                        setIsLoading(false);
                        setContent(result);
                    } else if (status === "failed") {
                        setIsLoading(false);
                        setRetryFlag(true);
                        setContent(undefined);
                    }
                };

                if (status !== "done") {
                    setTimeout(checkStatus, 3000);
                }
                if (status === "done") {
                    setRetryFlag(false);
                    setContent(result);
                }
            }
        } catch (error) {
            console.error(error);
            // navigate("/");
        } finally {
            setIsLoading(false);
        }
    }, [requestId]);

    const handleDownload = async () => {
        try {
            setIsDownload(true);
            saveAs(content as Blob, `${requestId}.pdf`);
            setIsDownload(false);
        } catch (error) {
            setIsDownload(false);
            console.error(error);
        }
    };

    useEffect(() => {
        //window.location.replace("/")
        Init();
    }, [Init]);

    return (
        <>
            <Box
                mt={10}
                pb={10}
                minH="100vh"
                display="flex"
                flexDirection="column"
            >
                <Breadcrumb.Root h="30px" w="90%" mx="auto">
                    <Breadcrumb.List>
                        <Breadcrumb.Item>
                            <Breadcrumb.Link href="/">
                                <LuHouse size="25px" />
                                <Text fontSize="17px">Home</Text>
                            </Breadcrumb.Link>
                        </Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb.Root>
                <Center w="full">
                    {isLoading ? (
                        <Center w="full">
                            <AnimationBox
                                w={"90%"}
                                dataState="open"
                                animationName="slide-from-bottom , fade-in"
                                animationDuration="500ms"
                            >
                                <Card.Root variant={"elevated"}>
                                    <Center p={10}>
                                        {retryFlag ? (
                                            <Text>
                                                시간이 걸립니다 잠시후에 다시
                                                시도 부탁드립니다
                                            </Text>
                                        ) : (
                                            <Spinner size={"xl"} />
                                        )}
                                    </Center>
                                </Card.Root>
                            </AnimationBox>
                        </Center>
                    ) : (
                        <Card.Root variant={"elevated"} w={"90%"}>
                            <Card.Body>
                                <AnimationBox
                                    w={"100%"}
                                    dataState="open"
                                    animationName="slide-from-bottom , fade-in"
                                    animationDuration="500ms"
                                >
                                    {content ? (
                                        <object
                                            width={"100%"}
                                            height={"1200px"}
                                            data={URL.createObjectURL(
                                                content as Blob
                                            )}
                                            type={content.type}
                                        ></object>
                                    ) : (
                                        <Center gap={"20px"}>
                                            <Icon size={"lg"} color={"red"}>
                                                <CiWarning />
                                            </Icon>

                                            <Heading>
                                                파일을 찾을 수 없습니다.
                                            </Heading>
                                        </Center>
                                    )}
                                </AnimationBox>
                            </Card.Body>
                        </Card.Root>
                    )}
                </Center>
            </Box>
            <Box position="fixed" bottom="30px" right="30px">
                <IconButton
                    size="2xl"
                    rounded="full"
                    bg="gray.200"
                    color="black"
                    _hover={{ bg: "gray.400" }}
                    onClick={() => {
                        handleDownload();
                    }}
                >
                    {!isDownload ? (
                        <LuDownload size="30px" />
                    ) : (
                        <Spinner size="md" />
                    )}
                </IconButton>
            </Box>
        </>
    );
};

export default ResultPage;
