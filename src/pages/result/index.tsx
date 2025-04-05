import { Box, Card, Center, Spinner, IconButton, Breadcrumb, Text } from "@chakra-ui/react";
import { useCallback, useState, useEffect } from "react";
import Markdown from "react-markdown";
import { Prose } from "../../components/ui/prose";
import { LuDownload, LuHouse } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import getResultByRequestId from "../../api/result/getResultByRequestId";
import downloadPdfFile from "../../api/result/downloadPdfFile";
import { AnimationBox } from "~/common/AnimationBox";
const ResultPage = () => {

    const requestId = useParams().requestId;
    const [content, setContent] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDownload, setIsDownload] = useState<boolean>(false);
    const navigate = useNavigate();

    const Init = useCallback(async () => {
        try {
            setIsLoading(true);
            if (requestId) {
                const result = await getResultByRequestId(requestId);
                setContent(result);
                console.log(result);
            }
        } catch (error) {
            console.error(error);
            navigate("/");

        } finally {
            setIsLoading(false);
        }
    }, [requestId]);

    const handleDownload = async () => {
        try {
            setIsDownload(true);
            await downloadPdfFile(requestId as string);
            setIsDownload(false);
        } catch (error) {
            setIsDownload(false);
            console.error(error);
        }
    }

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
                            <AnimationBox w={"90%"} dataState="open" animationName="slide-from-bottom , fade-in" animationDuration="500ms">
                                <Card.Root variant={"elevated"}>
                                    <Center p={10}>
                                        <Spinner size={"xl"} />
                                    </Center>
                                </Card.Root>
                            </AnimationBox>
                        </Center>
                    ) : (
                        <Card.Root variant={"elevated"} w={"90%"}>
                            <Card.Body>
                                <AnimationBox w={"90%"} dataState="open" animationName="slide-from-bottom , fade-in" animationDuration="500ms">
                                    <Prose>
                                        <Markdown>{content}</Markdown>
                                    </Prose>
                                </AnimationBox>
                            </Card.Body>
                        </Card.Root>
                    )}
                </Center>
            </Box >
            <Box position="fixed" bottom="30px" right="30px">
                <IconButton size="2xl" rounded="full" bg="gray.200" color="black" _hover={{ bg: "gray.400" }} onClick={() => {
                    handleDownload();
                }}>
                    {!isDownload ? (
                        <LuDownload size="30px" />
                    ) : <Spinner size="md" />
                    }
                </IconButton>
            </Box>
        </>
    );
};

export default ResultPage;
