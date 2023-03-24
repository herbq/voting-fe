import './election-card.css'
import { faCalendarDay, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserImageCollection from '../user-image-collection/user-image-collection.component';
// import { Numeral } from 'react-numeral';
import getEventTiming, { EVENT_STATUS } from '../../../services/general';
import { IElection } from '../../../interfaces';

interface IProps {
  startDate: number,
  endDate: number,
  title: string,
  candidates: IElection.Candidate[],
  votes: number,
  interests: number,
  [key: string]: any;
}

const ElectionCard = ({ startDate, endDate, title, candidates, votes, interests, color, ...props }: IProps) => {
  console.log(`cands `, candidates)
  const { eventStatus, dateString } = getEventTiming({ startDate, endDate });
  return <div {...props}>
    <div className='info1'>
      <div className='header'>
        <div className='timing'>
          <FontAwesomeIcon icon={faCalendarDay} />
          <p>{dateString}</p>
        </div>
        {(eventStatus == EVENT_STATUS.STARTING_SOON || eventStatus == EVENT_STATUS.SCHEDULED) && <div className='heart'><FontAwesomeIcon icon={faHeart} /></div>}
      </div>
      <p>{title}</p>
      <p>{candidates.map((candidate, i) => (candidate.name + (i != candidates.length - 1 ? ` vs. ` : ``)))}</p>
      <div className='footer'>
        {(eventStatus == EVENT_STATUS.ENDED) ? <p>Winner: Participant 2</p> : <UserImageCollection imgs={candidates.map(candidate => candidate.image)} />}
      </div>
    </div>
    {(eventStatus == EVENT_STATUS.STARTED || eventStatus == EVENT_STATUS.ENDING_SOON || eventStatus == EVENT_STATUS.ENDED) ?
      <div className='info2'>
        {votes >= 1001 && <p>+</p>}
        {votes > 0 ? votes : ((eventStatus == EVENT_STATUS.ENDED) ? `0 Votes` : `Be first to vote!`)}
        {votes > 0 ? <p>&nbsp;{`Votes`}</p> : null}
      </div>
      :
      <div className='info2'>
        {interests >= 1001 && <p>+</p>}
        interests
        <p>&nbsp;{`Interests`}</p>
      </div>}
  </div>
}

export default ElectionCard