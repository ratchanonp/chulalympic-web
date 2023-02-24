import React, { CSSProperties, lazy, Suspense, SVGAttributes } from "react";
import { IconContext } from "react-icons";

interface IProps {
    icon: string;
    color?: string;
    size?: string;
    className?: string;
    style?: CSSProperties;
    attr?: SVGAttributes<SVGElement>;
    fallback: JSX.Element | null;
}

const DynamicIcon: React.FC<IProps> = ({ ...props }) => {
    const [library, iconComponent] = props.icon.split("/");

    if (!library || !iconComponent) return <div>Could Not Find Icon</div>;

    const lib = library.toLowerCase();
    const path = `react-icons/${lib}`;
    const Icon = lazy(async () => {
        // eslint-disable-next-line @next/next/no-assign-module-variable
        const module = await import(path);
        return { default: module[iconComponent] };
    });

    const value: IconContext = {
        color: props.color,
        size: props.size,
        className: props.className,
        style: props.style,
        attr: props.attr,
    };

    return (
        <Suspense fallback={props.fallback}>
            <IconContext.Provider value={value}>
                <Icon />
            </IconContext.Provider>
        </Suspense>
    );
};

export default DynamicIcon;
