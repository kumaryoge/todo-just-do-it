import {
    CircleOutlined,
    ViewListRounded,
    CheckCircleOutlineRounded,
    EventOutlined,
    AddOutlined,
    TaskAltRounded,
    WbTwilightRounded,
    WbSunnyRounded,
    TagRounded,
    EventAvailableRounded,
    DateRangeRounded,
    HomeOutlined
} from "@mui/icons-material";
import { TaskListType } from "../types/all";
import DeleteIcon from "./DeleteIcon";
import SettingsIcon from "./SettingsIcon";

export function taskListIcon(type: TaskListType) {
    switch (type) {
        case "today":
            return <WbSunnyRounded fontSize="small" />;
        case "tomorrow":
            return <WbTwilightRounded fontSize="small" />;
        case "upcoming":
            return <EventAvailableRounded fontSize="small" />;
        case "unscheduled":
            return <DateRangeRounded fontSize="small" />;
        case "completed":
            return <TaskAltRounded fontSize="small" />;
        case "project":
            return <ViewListRounded fontSize="small" />;
        case "tag":
            return <TagRounded fontSize="small" />;
    }
}

export function homeIcon(onClick?: () => void) {
    return <HomeOutlined className={iconClasses(onClick)} fontSize="small" onClick={onClick} />;
}

export function projectIcon(onClick?: () => void) {
    return <ViewListRounded className={iconClasses(onClick)} fontSize="small" onClick={onClick} />;
}

export function tagIcon(onClick?: () => void) {
    return <TagRounded className={iconClasses(onClick)} fontSize="small" onClick={onClick} />;
}

export function taskIcon(onClick?: () => void) {
    return <CircleOutlined className={iconClasses(onClick)} fontSize="small" onClick={onClick} />;
}

export function completedTaskIcon(onClick?: () => void) {
    return <CheckCircleOutlineRounded className={iconClasses(onClick)} fontSize="small" onClick={onClick} />;
}

export function dateIcon(onClick?: () => void) {
    return <EventOutlined className={iconClasses(onClick)} fontSize="small" onClick={onClick} />;
}

export function addIcon(onClick?: () => void) {
    return <AddOutlined className={iconClasses(onClick)} fontSize="small" onClick={onClick} />;
}

export function deleteIcon(onClick: () => void) {
    return <DeleteIcon classes={iconClasses(onClick)} onClick={onClick} />;
}

export function settingsIcon(
    showBadge: boolean,
    expandTodayList: boolean,
    dontAutoCollapse: boolean,
    hideProjects: boolean,
    hideTags: boolean,
    onClick: () => void) {
    return (
        <SettingsIcon
            classes={iconClasses(onClick)}
            showBadge={showBadge}
            expandTodayList={expandTodayList}
            dontAutoCollapse={dontAutoCollapse}
            hideProjects={hideProjects}
            hideTags={hideTags}
            onClick={onClick}
        />
    );
}

function iconClasses(onClick?: () => void) {
    return "icon" + (onClick ? " clickable" : "");
}
