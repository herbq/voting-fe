
interface IGetEventTimingProps {
  startDate: number,
  endDate: number
}

export enum EVENT_STATUS {
  STARTED,
  ENDED,
  STARTING_SOON,
  ENDING_SOON,
  SCHEDULED,
}

const getEventTiming = ({ startDate, endDate }: IGetEventTimingProps) => {
  const diffStart = startDate - Date.now(), diffEnd = endDate - Date.now();

  let eventStatus: EVENT_STATUS = EVENT_STATUS.ENDED;

  if (endDate >= Date.now()) {
    if (startDate <= Date.now()) {
      if (diffEnd <= 1000) {
        eventStatus = EVENT_STATUS.ENDING_SOON;
      } else {
        eventStatus = EVENT_STATUS.STARTED;
      }
    } else {
      if (diffStart <= 1000) {
        eventStatus = EVENT_STATUS.STARTING_SOON;
      } else {
        eventStatus = EVENT_STATUS.SCHEDULED;
      }
    }
  }

  // const dateString = `${hasFinished ? `Finished` : (!hasStarted ? `Starts` : `Ends`)} ${diffDate <= 86400000 ? `Today` : (diffDate <= 2 * 86400000 ? `Tomorrow` : `in ${formatDate(date)}`)} at ${formatTime(date)}`;
  const dateString = `1d`;
  return { eventStatus, dateString }
}

export default getEventTiming;