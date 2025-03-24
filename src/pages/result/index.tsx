import { Box, Button, Card, Center, Spinner, defineAnimationStyles } from "@chakra-ui/react";
import { useCallback, useState, useEffect } from "react";
import FileUploadByUserId from "../../api/fileUpload/postFileByUserId";
import Markdown from "react-markdown";
import { Prose } from "../../components/ui/prose";
import { useParams } from "react-router-dom";
import getResultByRequestId from "../../api/result/getResultByRequestId";

const ResultPage = () => {
    const token = 'fwefwef'
    const sampleText = `# 인공지능(AI)의 발전과 미래

## 서론

인공지능(Artificial Intelligence, AI)은 21세기의 가장 혁신적인 기술 중 하나로 자리잡았습니다. 
이 기술은 우리의 일상생활부터 산업 전반에 이르기까지 광범위한 영향을 미치고 있습니다.

## 주요 발전 분야

### 1. 머신러닝과 딥러닝
- 데이터 기반 학습
- 패턴 인식 능력
- 자동화된 의사결정

### 2. 자연어 처리
- 언어 이해 및 생성
- 실시간 번역
- 챗봇 서비스

## 현재 활용 사례

1. **의료 분야**
   - 질병 진단
   - 신약 개발
   - 환자 데이터 분석

2. **금융 분야**
   - 위험 평가
   - 사기 탐지
   - 자동화된 거래

3. **교육 분야**
   - 맞춤형 학습
   - 자동 채점
   - 학습자 분석

## 미래 전망

앞으로 AI는 더욱 발전하여 다음과 같은 변화를 가져올 것으로 예상됩니다:

* 더 정교한 의사결정 시스템
* 인간-AI 협력 모델의 발전
* 윤리적 AI의 중요성 증대

## 결론

AI는 우리 사회를 근본적으로 변화시키고 있으며, 이러한 변화는 앞으로도 계속될 것입니다.
우리는 이러한 변화에 적절히 대응하고 준비해야 할 것입니다.

---

> "AI의 발전은 인류의 새로운 도약이 될 것입니다."
`;

    const requestId = useParams().requestId;
    const [content, setContent] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const Init = useCallback(async () => {
        try {
            setIsLoading(true);
            if (token) {
                const result = await getResultByRequestId(parseInt(requestId || '0'), token);
                // setContent(sampleText);
                console.log(content);
            }
        } catch (error) {
            setContent(sampleText + sampleText + sampleText + sampleText);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [requestId]);

    useEffect(() => {
        Init();
    }, [Init]);

    return (
        <Box
            mt={10}
            pb={10}
            minH="100vh"
            display="flex"
            alignItems="center"
        >
            <Center w="full">
                {isLoading ? (
                    <Center w="full">
                        <Box data-state="open"
                            _open={{
                                animationName: "slide-from-bottom-full, scale-in",
                                animationDuration: "300ms",
                            }} w={"90%"}>
                            <Card.Root variant={"elevated"}>
                                <Center p={10}>
                                    <Spinner size={"xl"} />
                                </Center>
                            </Card.Root>
                        </Box>
                    </Center>
                ) : (
                    <Card.Root variant={"elevated"} w={"90%"}>
                        <Card.Body>
                            <Box data-state="open"
                                _open={{
                                    animationName: "slide-from-bottom , fade-in",
                                    animationDuration: "500ms",
                                }}>
                                <Prose>
                                    <Markdown>{content}</Markdown>
                                </Prose>
                            </Box>
                        </Card.Body>
                    </Card.Root>
                )}
            </Center>
        </Box>
    );
};

export default ResultPage;
