import { Box, Card, Center, FileUpload, Heading, Icon } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";

const MainPage = () => {
    return (
        <Center w="100%" h="100%">
            <Card.Root w="800px" variant={"elevated"}>
                <Card.Header>
                    <Center>
                        <Heading>프로젝트 업로드</Heading>
                    </Center>
                </Card.Header>
                <Card.Body>
                    <FileUpload.Root alignItems="stretch" maxFiles={10}>
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
            </Card.Root>
        </Center>
    );
};

export default MainPage;
