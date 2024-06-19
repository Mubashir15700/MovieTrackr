import React from "react";
import { Tooltip } from "react-tooltip";

interface CustomTooltipProps {
    id: string;
    anchorSelect: string;
    place: "top" | "bottom" | "left" | "right";
    content: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
    id,
    anchorSelect,
    place,
    content,
}) => {
    return (
        <Tooltip
            id={id}
            anchorSelect={anchorSelect}
            place={place}
            content={content}
        >
            {content}
        </Tooltip>
    );
};

export default CustomTooltip;
