import { Box, Button, Card, Center, DialogFooter, FileUpload, Heading, Icon } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { useState } from "react";
import FileUploadByUserId from "../../api/fileUpload/postFileByUserId";

const MainPage = () => {
    const token = ""
    const [files, setFiles] = useState<File[]>([]);

    const handleFileUpload = (file: File) => {
        if (file.size > 3 * 1024 * 1024 * 1024) {
            alert("");
            return;
        }
        if (files.length >= 10) {
            alert("");
            return;
        }
        setFiles([...files, file]);
    }

    const requestFileUpload = async () => {
        try {
            const response = await FileUploadByUserId(files, token);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
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
                <Button
                        variant={"subtle"}
                        colorPalette={"black"}
                        onClick={() => requestFileUpload()}
                    >
                        업로드
                    </Button>
            </Card.Root>
        </Center>
    );
};

export default MainPage;
