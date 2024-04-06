import {useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";

import '@styles/announcements/announcement.css'


export const AnnouncementPage = () => {
    const { announcementId } = useParams()

    return <>
        <Helmet><title>Tytuł ogłoszenia {announcementId}</title></Helmet>

        <section className="announcement-header">
            <div>
                <span>Tytuł ogłoszenia {announcementId}</span>
                <span>dodano 2024-04-04 17:57:16</span>
            </div>
            <div className="announcement-report action-report">
                <i className="material-icons">flag</i>
                <span>Zgłoś ogłoszenie</span>
            </div>
        </section>
        <section className="announcement-view">
            <div className="about-pet">
                <div className="like">
                    <i className="material-icons icon-button action-like"></i>
                </div>

                <div className="photo"></div>
                <div className="info">
                    <div>
                        <div>
                            <span>Typ</span>
                            <span className="capitalize">Typ zwierzaka</span>
                        </div>
                        <div>
                            <span>Gatunek</span>
                            <span className="capitalize">Gatunek</span>
                        </div>
                        <div>
                            <span>Płeć</span>
                            <span>Płeć</span>
                        </div>
                        <div>
                            <span>Wiek</span>
                            <span>Wiek</span>
                        </div>
                    </div>
                    <hr/>
                    <div className="badges">
                        Cechy zwierzaka
                    </div>
                    <hr className="resp-only"/>
                </div>
                <div className="description">
                    Opis zwierzaka
                </div>
            </div>
            <div className="about-user">
                <div className="user-basic">
                    <div className="avatar resp"></div>
                    <div>
                        <div className="name">Imie i naziwsko</div>
                        <div>
                            <i className="material-icons">location_on</i>
                            <span>Miasto</span>
                        </div>
                    </div>
                </div>
                <div className="inline">
                    <span>Cena</span>
                    <span>Cena lub oddam za darmo</span>
                </div>
                <div className="inline">
                    <span>Numer telefonu</span>
                    <span>000000000</span>
                </div>
            </div>
        </section>
    </>
}