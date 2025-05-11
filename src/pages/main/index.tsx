import {
  Box,
  Button,
  Card,
  Center,
  FileUpload,
  Heading,
  Icon,
  CheckboxGroup,
  Flex,
  Text,
  Separator,
  ButtonGroup,
  Group,
  Input,
  Tabs,
} from "@chakra-ui/react";
import { LuUpload, LuFolder, LuGithub } from "react-icons/lu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Default from "~/config/Default";
import postFileByRequestId from "~/api/result/postFileByRequestId";
import { Checkbox } from "~/components/ui/checkbox";
import React from "react";
import Confirm from "~/pages/confirm";
import { AnimationBox } from "~/common/AnimationBox";
import { throttle } from "lodash";
const MainPage = () => {
  const [file, setFiles] = useState<File>();
  const [checkElementList, setCheckElementList] = useState<CheckElementList[]>(
    Default.CheckElementList
  );
  const [mode, setMode] = useState<"upload" | "token" | "github">("upload");
  const navigate = useNavigate();
  const [requestId, setRequestId] = useState<string>("");
  const [initId, setInitId] = useState<string>("");
  const [githubLink, setGithubLink] = useState<string>("");

  const requestThrottle = throttle(
    async (
      file: File | undefined,
      checkElementList: CheckElementList[],
      githubLink: string
    ) => {
      const requestId = await postFileByRequestId(
        file,
        checkElementList,
        githubLink
      );
      setInitId(requestId);
    },
    2000
  );

  const requestFileUpload = async () => {
    try {
      if (!file && mode === "upload") throw new Error("No file selected");
      requestThrottle(file, checkElementList, githubLink);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = (file: File) => {
    setFiles(file);
  };

  const handleCheckElementList = (details: string[]) => {
    console.log("details", details);
    const newCheckElementList = Default.CheckBoxAllList.filter((checkList) =>
      details.includes(checkList.id.toString())
    ).map((checkList) => ({
      id: checkList.id.toString(),
      name: checkList.name,
    }));
    console.log("newCheckElementList", newCheckElementList);
    setCheckElementList(newCheckElementList);
    console.log("checkElementList", checkElementList);
  };

  useEffect(() => {
    setFiles(undefined);
    setCheckElementList(Default.CheckElementList);
    setInitId("");
    setGithubLink("");
  }, [mode]);

  console.log("defcheckElementList", checkElementList);
  console.log("111defcheckElementList", Default.CheckBoxElementListObject);

  return initId === "" ? (
    <Center w="100%" h="100%">
      <AnimationBox
        dataState="open"
        animationName="slide-from-bottom , fade-in"
        animationDuration="500ms"
      >
        <ButtonGroup m="10px" ml="0px" size="lg" variant="outline">
          <Tabs.Root
            defaultValue="upload"
            variant="plain"
            onValueChange={(details) => {
              console.log(details);
              setMode(details.value as "upload" | "token" | "github");
              console.log(mode);
            }}
          >
            <Tabs.List bg="bg.muted" rounded="l3" p="1">
              <Tabs.Trigger value="upload">
                <LuUpload />
                파일 업로드
              </Tabs.Trigger>
              <Tabs.Trigger value="github">
                <LuGithub />
                깃헙 링크
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
              {mode === "upload" ? (
                <Heading>프로젝트 업로드</Heading>
              ) : mode === "github" ? (
                <Heading>GitHub 링크</Heading>
              ) : (
                <Heading>결과 창보기(토큰 입력)</Heading>
              )}
            </Center>
          </Card.Header>
          {mode === "upload" ? (
            <Card.Body>
              <FileUpload.Root
                alignItems="stretch"
                maxFiles={1}
                onFileChange={(details) =>
                  handleFileUpload(details.acceptedFiles[0])
                }
              >
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
                  {mode === "github" ? (
                    <Input
                      flex=""
                      placeholder="input github link"
                      onChange={(e) => setGithubLink(e.target.value)}
                    />
                  ) : (
                    <Input
                      flex=""
                      placeholder="input request token"
                      onChange={(e) => setRequestId(e.target.value)}
                    />
                  )}
                  <Button
                    onClick={() => {
                      if (mode === "github") {
                        requestFileUpload();
                      } else {
                        navigate(`/${requestId}/result`);
                      }
                    }}
                    ml="10px"
                    bg="bg.subtle"
                    variant="outline"
                  >
                    {mode === "github" ? "링크 업로드" : "결과 창 보기"}
                  </Button>
                </Group>
              </Center>
            </Card.Body>
          )}
          {(mode === "upload" || mode === "github") && (
            <>
              <Card.Footer mt="20px" flexDirection="column" w="full">
                {Object.entries(Default.CheckBoxElementListObject).map(
                  ([_, value], index: number) => (
                    <React.Fragment key={index}>
                      <Flex ml="5%" w="full" flexDirection="Row" gap="12">
                        <Text alignSelf="center" w="12%">
                          코드 품질
                        </Text>
                        <Separator orientation="vertical" />
                        <CheckboxGroup
                          w="90%"
                          value={checkElementList.map((checkElement) => {
                            console.log("11111checkElement", checkElement);
                            return checkElement.id.toString();
                          })}
                          onValueChange={handleCheckElementList}
                          flexDirection="Row"
                          gap="6"
                          display="flex"
                          flexWrap="wrap"
                        >
                          {value.map((checkList) => (
                            <Checkbox
                              key={checkList.id}
                              value={checkList.id.toString()}
                            >
                              {checkList.name}
                            </Checkbox>
                          ))}
                        </CheckboxGroup>
                      </Flex>
                      {/* {index !== 0 && (
                        <Separator
                          mt="10px"
                          w="full"
                          orientation="horizontal"
                        />
                      )} */}
                    </React.Fragment>
                  )
                )}
              </Card.Footer>
              {mode === "upload" && (
                <Button
                  variant={"subtle"}
                  colorPalette={"black"}
                  onClick={() => {
                    requestFileUpload();
                  }}
                >
                  업로드
                </Button>
              )}
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
