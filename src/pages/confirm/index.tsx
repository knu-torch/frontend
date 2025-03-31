import { Card, Center, Heading, Group, Input, Button, Clipboard, Box, Text } from "@chakra-ui/react";
import { LuCheck,LuExternalLink  } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

interface ConfirmProps {
    requestId: string;
}

const Confirm = ({ requestId }: ConfirmProps) => {
    const navigate = useNavigate();
    return (
        <Center w="100%" h="100%">
            <Card.Root w="1000px" variant={"elevated"}>
                <Card.Body>
                    <Center mb="50px">
                        <Box ml={"70px"} data-state="open"
                            _open={{
                                animationName: "slide-from-bottom , fade-in",
                                animationDuration: "1000ms",
                            }}>
                            <LuCheck color="lightgreen" size={500} />
                        </Box>
                    </Center>
                    {/* <Center flexDirection="column" gap={4}>
                        <Heading>확인 완료</Heading>
                        <Text color="gray.600" textAlign="center" fontSize="lg">
                            프로젝트가 성공적으로 제출되었습니다! 🎉
                            <br />
                            아래의 Request ID를 복사하여 안전하게 보관해주세요.
                            <br />
                            분석 결과를 확인하실 때 필요합니다.
                        </Text>
                    </Center> */}
                </Card.Body>
                <Card.Footer>
                    <Center mt="10px" w="full">
                        <Group attached w="full" maxW="lg">
                            <Input w="full" h={"41px"} flex="" placeholder="Enter your request Token" value={requestId} />
                            <Clipboard.Root ml="15px" value={requestId}>
                                <Clipboard.Trigger asChild>
                                    <Button variant="surface" size="md">
                                        <Clipboard.Indicator />
                                        <Clipboard.CopyText />
                                    </Button>
                                </Clipboard.Trigger>
                            </Clipboard.Root>
                        </Group>
                        <Button ml="20px" variant="surface" size="md" onClick={() => {
                            navigate(`/${requestId}/result`);
                        }}>
                            결과 바로 확인하기
                            <LuExternalLink />
                        </Button>
                    </Center>
                </Card.Footer>
            </Card.Root>
        </Center>
    )
}

export default Confirm;
