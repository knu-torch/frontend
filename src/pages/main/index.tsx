import { Box, Button, Card, Center, FileUpload, Heading, Icon, CheckboxGroup, Flex, Text, Separator, ButtonGroup, Group, Input, Tabs } from "@chakra-ui/react";
import { LuUpload, LuUser, LuFolder, LuSquareCheck } from "react-icons/lu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckLists from "../../config/CheckLists";
import Default from "../../config/Default";
import postFileByRequestId from "../../api/result/postFileByRequestId";
import { Checkbox } from "~/components/ui/checkbox";
import React from "react";
import Confirm from "../confirm";
import { AnimationBox } from "~/common/AnimationBox";
const MainPage = () => {
    const [file, setFiles] = useState<File>();
    const [checkElementList, setCheckElementList] = useState<CheckElementList[]>(Default.CheckElementList);
    const [mode, setMode] = useState<ButtonMode>("upload");
    const navigate = useNavigate();
    const [requestId, setRequestId] = useState<string>("");
    const [initId, setInitId] = useState<string>("");


    const requestFileUpload = async () => {
        try {
            if (!file) throw new Error("No file selected");
            const requestId = await postFileByRequestId(file, checkElementList);
            setInitId(requestId);
        } catch (error) {
            console.error(error);
        }
    }

    const handleFileUpload = (file: File) => {
        setFiles(file);
    }

    const handleCheckElementList = (details: string[]) => {
        console.log(details);
        const newCheckElementList = CheckLists
            .filter(checkList => details.includes(checkList.id.toString()))
            .map(checkList => ({
                id: checkList.id.toString(),
                value: checkList.value
            }));
        setCheckElementList(newCheckElementList);
    }

    return initId === "" ? (
        <Center w="100%" h="100%">
            <AnimationBox dataState="open" animationName="slide-from-bottom , fade-in" animationDuration="500ms">
                <ButtonGroup m="10px" ml="0px" size="lg" variant="outline">
                    <Tabs.Root defaultValue="upload" variant="plain" onValueChange={(details) => {
                        console.log(details);
                        setMode(details.value as ButtonMode);
                        console.log(mode);
                    }}>
                        <Tabs.List bg="bg.muted" rounded="l3" p="1">
                            <Tabs.Trigger value="upload">
                                <LuUser />
                                파일 업로드
                            </Tabs.Trigger>
                            <Tabs.Trigger value="result">
                                <LuFolder />
                                결과 창보기(요청 아이디)
                            </Tabs.Trigger>
                            <Tabs.Indicator rounded="l2" />
                        </Tabs.List>
                    </Tabs.Root>
                </ButtonGroup>
                <Card.Root w="800px" variant={"elevated"}>
                    <Card.Header>
                        <Center>
                            {mode === "upload" ? <Heading>프로젝트 업로드</Heading> : <Heading>결과 창보기(토큰 입력)</Heading>}
                        </Center>
                    </Card.Header>
                    {mode === "upload" ? (
                        <Card.Body>
                            <FileUpload.Root alignItems="stretch" maxFiles={1} onFileChange={(details) => handleFileUpload(details.acceptedFiles[0])}>
                                <FileUpload.HiddenInput />
                                <FileUpload.Dropzone>
                                    <Icon size="md" color="fg.muted">
                                        <LuUpload />
                                    </Icon>
                                    <FileUpload.DropzoneContent>
                                        <Box>Drag and drop files here</Box>
                                        <Box color="fg.muted">.zip up to 3GB</Box>
                                    </FileUpload.DropzoneContent>
                                </FileUpload.Dropzone>
                                <FileUpload.List />
                            </FileUpload.Root>
                        </Card.Body>
                    ) : (
                        <Card.Body p="50px">
                            <Center>
                                <Group attached w="full" maxW="lg">
                                    <Input flex="" placeholder="Enter your request Token" onChange={(e) => setRequestId(e.target.value)} />
                                    <Button onClick={() => {
                                        navigate(`/${requestId}/result`);
                                    }} ml="10px" bg="bg.subtle" variant="outline">
                                        결과 창 보기
                                    </Button>
                                </Group>
                            </Center>
                        </Card.Body>
                    )}
                    {mode === "upload" && (
                        <>
                            <Card.Footer flexDirection="column" w="full">
                                {Object.entries(Default.CheckBoxElementListObject).map(([key, value], index: number) => (
                                    <React.Fragment key={index}>
                                        <Flex ml="5%" w="full" flexDirection="Row" gap="12">
                                            <Text w="12%">코드 품질</Text>
                                            <Separator orientation="vertical" />
                                            <CheckboxGroup w="90%"
                                                value={checkElementList.map((checkElement) => checkElement.id.toString())}
                                                onValueChange={handleCheckElementList}
                                                flexDirection="Row"
                                                gap="12"
                                            >
                                                {value.map((checkList, index) => (
                                                    <Checkbox key={checkList.id} value={(checkList.id).toString()}>
                                                        {checkList.name}
                                                    </Checkbox>
                                                ))}
                                            </CheckboxGroup>
                                        </Flex>
                                        {index !== 3 && <Separator w="full" orientation="horizontal" />}
                                    </React.Fragment>
                                ))}
                            </Card.Footer>
                            <Button
                                variant={"subtle"}
                                colorPalette={"black"}
                                onClick={() => {
                                    requestFileUpload()
                                }}
                            >
                                업로드
                            </Button>
                        </>
                    )}
                </Card.Root>
            </AnimationBox>
        </Center>
    ) : (
        <Confirm requestId={initId as string} />
    );
};

export default MainPage;
