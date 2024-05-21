import {Link} from "react-router-dom";
import {IAnnouncement} from "@/interfaces/App.ts";
import {absoluteServerPath, formatPrice, formatTimeUnits} from "@/utils/utils.ts";

export const AnnouncementGridElement = ({announcement}: { announcement: IAnnouncement }) => {
    const petAvatar = `url(${absoluteServerPath(announcement.uploads[0]?.mediaObject.contentUrl)})`

    return <Link to={`/announcement/${announcement.id}`} className={'announcement'}>
        <div className="announcement-image" style={{backgroundImage: petAvatar}}></div>
        {
            announcement.isAccepted ? null :
                <div className='awaiting'><span>Oczekuje na akceptację</span></div>
        }
        {
            !announcement.announcementReports || !announcement.announcementReports.length ? null :
                <div className='awaiting'><span>Liczba zgłoszeń: {announcement.announcementReports.length}</span></div>
        }
        <div className="announcement-data">
            <div className="announcement-detail">
                <div className="flex-center gap-10">
                    <div className="announcement-avatar"
                         style={{backgroundImage: petAvatar}}></div>
                    <div className="announcement-name">
                        <div>{announcement.announcementDetail.name}</div>
                        <div>{announcement.animalType.name}</div>
                    </div>
                </div>
                <div className="flex-center gap-5">
                    <i className="material-icons">location_on</i>
                    <span>{announcement.announcementDetail.locality}</span>
                </div>
            </div>
            <hr/>
            <div className="announcement-price">
                <div className="flex-center gap-5">
                    <i className="material-icons">date_range</i>
                    <span>{formatTimeUnits(announcement.announcementDetail.age as number, announcement.announcementDetail.ageType)}</span>
                </div>
                <div className="flex-center gap-5">
                    <i className="material-icons">account_balance_wallet</i>
                    <span>{formatPrice(announcement.announcementDetail.price as number)}</span>
                </div>
            </div>
        </div>
    </Link>
}