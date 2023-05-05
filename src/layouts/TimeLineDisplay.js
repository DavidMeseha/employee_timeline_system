import useDisplayManger from "@/Hooks/useDisplayManger";
import WeeklyTimeLine from "./WeeklyDisplay";
import DailyDisplay from "./DailyDisplay";

const TimeLineDisplay = () => {
    const { format } = useDisplayManger()


    return (
        <>
            <div>
                {format === 'daily' ? <DailyDisplay /> : <WeeklyTimeLine />}
            </div>
        </>
    )
};
export default TimeLineDisplay;