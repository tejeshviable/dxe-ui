import React from "react";
import { ReactComponent as FaceBook } from "../../assets/Icons.svg";
import { ReactComponent as Instagram } from "../../assets/Insta.svg";
import { ReactComponent as LinkedIN } from "../../assets/LinkedIN.svg";
import { ReactComponent as ThirdStep } from "../../assets/LinkedIN.svg";
// import { ReactComponent as LinkedIN } from "../../assets/LinkedIN.svg";


const ICON = {

    facebook: <FaceBook className="icon" />,
    instagram: <Instagram className="icon" />,
    linkedin: <LinkedIN className="icon" />,
}


export const SvgImageComponent = ({ icon }) => {
    return ICON[icon];
};
