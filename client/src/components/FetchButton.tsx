import React from "react";

interface FetchButtonProps {
    onClick: () => void;
}

const FetchButton: React.FC<FetchButtonProps> = ({ onClick }) => {
    return (
        <button className="button" onClick={onClick}>
            Click
        </button>
    );
};

export default FetchButton;
