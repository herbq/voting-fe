import './elections.css'
import ElectionCard from '../../components/elections/election-card/election-card.component';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import useToggle from '../../hooks/toggle.hook';
import getEventTiming, { EVENT_STATUS } from '../../services/general';
import ShowTimer from '../../components/base/show-timer/show-timer.component';
import IconButton from '../../components/common/icon-button/icon-button.component';
import { getElections } from '../../controllers/election.controller';
import { IElection } from '../../interfaces';

const ElectionsPage = () => {
    const navigate = useNavigate();
    const [elections, setElections] = useState<IElection.Election[]>([])
    const [showModal, toggleShowModal] = useToggle(true)
    const [sortingItems, setSortingItems] = useState([`🏆 Just Finished`, `🕑 Ending Soon`, `🔥 Top Elections`, `⏰ Starting Soon`])
    const endedElections: IElection.Election[] = [], endingSoonElections: IElection.Election[] = [], startedElections: IElection.Election[] = [],
        startingSoonElections: IElection.Election[] = [], scheduledElections: IElection.Election[] = [];

    useEffect(() => { // Fetching data
        const fetchElections = () => {
            getElections().then(
                (res: IElection.ElectionsResponse) => {
                    setElections(res.data)
                }
            )
        }

        fetchElections()
        setInterval(fetchElections, 10000); // Fetching elections every x seconds
    }, [])

    for (let i = 0; i < elections.length; i++) {
        const { eventStatus } = getEventTiming({ startDate: elections[i].dates.start, endDate: elections[i].dates.finish });
        if (eventStatus == EVENT_STATUS.STARTED) startedElections.push({ ...elections[i], eventStatus })
        if (eventStatus == EVENT_STATUS.ENDED) endedElections.push({ ...elections[i], eventStatus })
        if (eventStatus == EVENT_STATUS.STARTING_SOON) startingSoonElections.push({ ...elections[i], eventStatus })
        if (eventStatus == EVENT_STATUS.ENDING_SOON) endingSoonElections.push({ ...elections[i], eventStatus })
        if (eventStatus == EVENT_STATUS.SCHEDULED) scheduledElections.push({ ...elections[i], eventStatus })
    }
    console.log(`Elections arrays: `, { startedElections, endedElections, startingSoonElections, endingSoonElections, scheduledElections })
    return (
        <ShowTimer timeout={0}>
            <div className="elections-page hidable">
                {/* {showModal && <SortingModal setShowModal={setShowModal} sortingItems={sortingItems} setSortingItems={setSortingItems}></SortingModal>} */}
                <div className="elections-container">
                    <div className="header">
                        <IconButton onClick={() => {
                            // setShowModal(true)$
                            console.log(`show modal`)
                        }} icon={faSort}> Sort</IconButton>
                    </div>

                    {sortingItems.map((sortingItem) => {
                        if (sortingItem == `🏆 Just Finished` && endedElections.length != 0) {
                            return <div className='section'>
                                <p>🏆 Just Finished</p>
                                {endedElections.map((election, i) => <ShowTimer timeout={80 * i}><ElectionCard key={election.title} onClick={() => { navigate(`/heyelection`) }} className={`hidable election-card${election.eventStatus == EVENT_STATUS.ENDED ? ` ended` : (EVENT_STATUS.STARTING_SOON) ? ` starting` : ``}`} title={election.title} candidates={election.candidates} startDate={election.dates.start} endDate={election.dates.finish} votes={election.votes.length} interests={election.interests.length} /></ShowTimer>)}
                            </div>
                        } else if (sortingItem == `🕑 Ending Soon` && endingSoonElections.length != 0) {
                            return <div className='section'>
                                <p>🕑 Ending Soon</p>
                                {endingSoonElections.map((election, i) => <ShowTimer timeout={80 * i}><ElectionCard key={election.title} onClick={() => { navigate(`/heyelection`) }} className={`hidable election-card${election.eventStatus == EVENT_STATUS.ENDED ? ` ended` : (EVENT_STATUS.STARTING_SOON) ? ` starting` : ``}`} title={election.title} candidates={election.candidates} startDate={election.dates.start} endDate={election.dates.finish} votes={election.votes.length} interests={election.interests.length} /></ShowTimer>)}
                            </div>
                        } else if (sortingItem == `🔥 Top Elections` && startedElections.length != 0) {
                            return <div className='section'>
                                <p>🔥 Top Elections</p>
                                {startedElections.map((election, i) => <ShowTimer timeout={80 * i}><ElectionCard key={election.title} onClick={() => { navigate(`/heyelection`) }} className={`hidable election-card${election.eventStatus == EVENT_STATUS.ENDED ? ` ended` : (EVENT_STATUS.STARTING_SOON) ? ` starting` : ``}`} title={election.title} candidates={election.candidates} startDate={election.dates.start} endDate={election.dates.finish} votes={election.votes.length} interests={election.interests.length} /></ShowTimer>)}
                            </div>
                        } else if (sortingItem == `⏰ Starting Soon` && startingSoonElections.length != 0) {
                            return <div className='section'>
                                <p>⏰ Starting Soon</p>
                                {startingSoonElections.map((election, i) => <ShowTimer timeout={80 * i}><ElectionCard key={election.title} onClick={() => { navigate(`/heyelection`) }} className={`hidable election-card${election.eventStatus == EVENT_STATUS.ENDED ? ` ended` : (EVENT_STATUS.STARTING_SOON) ? ` starting` : ``}`} title={election.title} candidates={election.candidates} startDate={election.dates.start} endDate={election.dates.finish} votes={election.votes.length} interests={election.interests.length} /></ShowTimer>)}
                            </div>
                        } else if (sortingItem == `🗓️ Scheduled` && scheduledElections.length != 0) {
                            return <div className='section'>
                                <p>🗓️ Scheduled</p>
                                {scheduledElections.map((election, i) => <ShowTimer timeout={80 * i}><ElectionCard key={election.title} onClick={() => { navigate(`/heyelection`) }} className={`hidable election-card${election.eventStatus == EVENT_STATUS.ENDED ? ` ended` : (EVENT_STATUS.STARTING_SOON) ? ` starting` : ``}`} title={election.title} candidates={election.candidates} startDate={election.dates.start} endDate={election.dates.finish} votes={election.votes.length} interests={election.interests.length} /></ShowTimer>)}
                            </div>
                        }
                    })}
                    {/* {finished.length != 0 && <p>🏆 Just Finished</p>}
                    {finished.map((election, i) => <ShowTimer timeout={80 * i}><ElectionCard key={election.startDate} onClick={() => { navigate(`${election.uuid}`) }} className={`hidable election-card${election.hasFinished ? ` ended` : (!election.hasStarted) ? ` starting` : ``}`} candidates={{ names: election.names, imgs: election.imgs }} startDate={election.startDate} endDate={election.endDate} votes={election.votes} interests={election.interests} /></ShowTimer>)}
                    {finished.length != 0 && (endingSoon.length != 0 || current.length != 0 || startingSoon.length) != 0 && <Split></Split>}

                    {endingSoon.length != 0 && <p>🕑 Ending Soon</p>}
                    {endingSoon.map((election, i) => <ShowTimer timeout={80 * i}><ElectionCard key={election.startDate} onClick={() => { navigate(`${election.uuid}`) }} className={`hidable election-card${election.hasFinished ? ` ended` : (!election.hasStarted) ? ` starting` : ``}`} candidates={{ names: election.names, imgs: election.imgs }} startDate={election.startDate} endDate={election.endDate} votes={election.votes} interests={election.interests} /></ShowTimer>)}
                    {endingSoon.length != 0 && (current.length != 0 || startingSoon.length) != 0 && <Split></Split>}

                    {current.length != 0 && <p>🔥 Top Elections</p>}
                    {current.map((election, i) => <ShowTimer timeout={80 * i}><ElectionCard key={election.startDate} onClick={() => { navigate(`${election.uuid}`) }} className={`hidable election-card${election.hasFinished ? ` ended` : (!election.hasStarted) ? ` starting` : ``}`} candidates={{ names: election.names, imgs: election.imgs }} startDate={election.startDate} endDate={election.endDate} votes={election.votes} interests={election.interests} /></ShowTimer>)}
                    {current.length != 0 && (startingSoon.length) != 0 && <Split></Split>}

                    {startingSoon.length != 0 && <p>⏰ Starting Soon</p>}
                    {startingSoon.map((election, i) => <ShowTimer timeout={80 * i}><ElectionCard key={election.startDate} onClick={() => { navigate(`${election.uuid}`) }} className={`hidable election-card${election.hasFinished ? ` ended` : (!election.hasStarted) ? ` starting` : ``}`} candidates={{ names: election.names, imgs: election.imgs }} startDate={election.startDate} endDate={election.endDate} votes={election.votes} interests={election.interests} /></ShowTimer>)} */}
                </div>
            </div>
        </ShowTimer>
    )
}

export default ElectionsPage;