import { Box } from "@chakra-ui/react";
import { AnimationBoxProps } from "../types/AnimationBoxPros";

export const AnimationBox = ({ 
    dataState, 
    animationName, 
    animationDuration, 
    children, 
    w 
}: AnimationBoxProps) => {
    return (
        <Box 
            {...(dataState && { "data-state": dataState })}
            {...(animationName && animationDuration && {
                _open: {
                    animationName,
                    animationDuration,
                }
            })}
            {...(w && { w })}
        >
            {children}
        </Box>
    );
};