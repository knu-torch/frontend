import { Box, Button, Card, Center, DialogFooter, FileUpload, Heading, Icon, CheckboxGroup, CheckboxCard, Flex, Grid } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { useState } from "react";
import FileUploadByUserId from "../../api/fileUpload/postFileByUserId";
import { useNavigate } from "react-router-dom";
import CheckLists from "../../config/CheckLists";
import { CheckboxCard as ChakraCheckboxCard } from "../../components/ui/checkbox-card";
import CheckElementList from "../../types/checkElementList";
import Default from "../../config/Default";
import postSelectedElementByRequestId from "../../api/result/postSelectedElmentByRequestId";
import { Checkbox } from "~/components/ui/checkbox";
const MainPage = () => {
    const token = ""
    const [files, setFiles] = useState<File[]>([]);
    const [checkElementList, setCheckElementList] = useState<CheckElementList[]>(Default.CheckElementList);
    const [requestId, setRequestId] = useState<string>("");
    const navigate = useNavigate();
    const requestFileUpload = async () => {
        setRequestId("1234");
        try {
            const requestId = await postSelectedElementByRequestId(files, checkElementList);
            setRequestId(requestId);
        } catch (error) {
            console.error(error);
        }
    }

    const handleFileUpload = (file: File) => {
        setFiles([...files, file]);
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

    return (
        <Center w="100%" h="100%">
            <Card.Root w="800px" variant={"elevated"}>
                <Card.Header>
                    <Center>
                        <Heading>프로젝트 업로드</Heading>
                    </Center>
                </Card.Header>
                <Card.Body>
                    <FileUpload.Root alignItems="stretch" maxFiles={10} onFileChange={(details) => handleFileUpload(details.acceptedFiles[0])}>
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
                <Card.Footer flexDirection="column" w="full" gap="10">
                    <Grid ml="20px" templateColumns="repeat(1, 1fr)" gap="5" w="100%">
                        <CheckboxGroup w="full"
                            value={checkElementList.map((checkElement) => checkElement.id.toString())}
                            onValueChange={handleCheckElementList}
                        >
                            <Checkbox>
                                {checkElementList.map((checkElement) => checkElement.value)}
                            </Checkbox>
                        </CheckboxGroup>
                        <CheckboxGroup w="100%"
                            value={checkElementList.map((checkElement) => checkElement.id.toString())}
                            onValueChange={handleCheckElementList}
                        >
                            <Grid templateColumns="repeat(4, 1fr)" gap="3" w="100%">
                                {CheckLists.map((checkList, index) => (
                                    <Checkbox key={checkList.id}
                                        value={(checkList.id).toString()}
                                    >
                                        {checkList.value}
                                    </Checkbox>
                                ))}
                            </Grid>
                        </CheckboxGroup>
                    </Grid>
                    <Grid ml="20px" templateColumns="repeat(1, 1fr)" gap="5" w="100%">
                        <CheckboxGroup w="full"
                            value={checkElementList.map((checkElement) => checkElement.id.toString())}
                            onValueChange={handleCheckElementList}
                        >
                            <Checkbox>
                                {checkElementList.map((checkElement) => checkElement.value)}
                            </Checkbox>
                        </CheckboxGroup>
                        <CheckboxGroup w="100%"
                            value={checkElementList.map((checkElement) => checkElement.id.toString())}
                            onValueChange={handleCheckElementList}
                        >
                            <Grid templateColumns="repeat(4, 1fr)" gap="3" w="100%">
                                {CheckLists.map((checkList, index) => (
                                    <Checkbox  key={checkList.id}
                                        value={(checkList.id).toString()}
                                    >
                                        {checkList.value}
                                    </Checkbox>
                                ))}
                            </Grid>
                        </CheckboxGroup>
                    </Grid>
                    <Grid ml="20px" templateColumns="repeat(1, 1fr)" gap="5" w="100%">
                        <CheckboxGroup w="full"
                            value={checkElementList.map((checkElement) => checkElement.id.toString())}
                            onValueChange={handleCheckElementList}
                        >
                            <Checkbox>
                                {checkElementList.map((checkElement) => checkElement.value)}
                            </Checkbox>
                        </CheckboxGroup>
                        <CheckboxGroup w="100%"
                            value={checkElementList.map((checkElement) => checkElement.id.toString())}
                            onValueChange={handleCheckElementList}
                        >
                            <Grid templateColumns="repeat(4, 1fr)" gap="3" w="100%">
                                {CheckLists.map((checkList, index) => (
                                    <Checkbox key={checkList.id}
                                        value={(checkList.id).toString()}
                                    >
                                        {checkList.value}
                                    </Checkbox>
                                ))}
                            </Grid>
                        </CheckboxGroup>
                    </Grid>
                    <Grid ml="20px" templateColumns="repeat(1, 1fr)" gap="5" w="100%">
                        <CheckboxGroup w="full"
                            value={checkElementList.map((checkElement) => checkElement.id.toString())}
                            onValueChange={handleCheckElementList}
                        >
                            <Checkbox>
                                {checkElementList.map((checkElement) => checkElement.value)}
                            </Checkbox>
                        </CheckboxGroup>
                        <CheckboxGroup w="100%"
                            value={checkElementList.map((checkElement) => checkElement.id.toString())}
                            onValueChange={handleCheckElementList}
                        >
                            <Grid templateColumns="repeat(4, 1fr)" gap="3" w="100%">
                                {CheckLists.map((checkList, index) => (
                                    <Checkbox key={checkList.id}
                                        value={(checkList.id).toString()}
                                    >
                                        {checkList.value}
                                    </Checkbox>
                                ))}
                            </Grid>
                        </CheckboxGroup>
                    </Grid>
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
                <Button
                    variant={"subtle"}
                    colorPalette={"black"}
                    onClick={() => {
                        navigate(`/${requestId}/result`)
                    }}
                >
                    결과 보기
                </Button>
            </Card.Root>
        </Center>
    );
};

export default MainPage;
