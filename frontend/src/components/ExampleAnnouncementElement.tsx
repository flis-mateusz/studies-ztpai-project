import {Link} from "react-router-dom";

export const ExampleAnnouncementElement = () => {
    return <Link to={'/announcement/12'} className={'announcement'}>
        <div className="announcement-image" style={{backgroundImage: "url(/example.jpg)"}}></div>
        <div className="announcement-data">
            <div className="announcement-detail">
                <div className="flex-center gap-10">
                    <div className="announcement-avatar"
                         style={{backgroundImage: "url(/example.jpg)"}}></div>
                    <div className="announcement-name">
                        <div>Rudy Rydz</div>
                        <div>kot</div>
                    </div>
                </div>
                <div className="flex-center gap-5">
                    <i className="material-icons">location_on</i>
                    <span>Kielce</span>
                </div>
            </div>
            <hr/>
            <div className="announcement-price">
                <div className="flex-center gap-5">
                    <i className="material-icons">date_range</i>
                    <span>7 miesięcy</span>
                </div>
                <div className="flex-center gap-5">
                    <i className="material-icons">account_balance_wallet</i>
                    <span>1 zł</span>
                </div>
            </div>
        </div>
    </Link>
}