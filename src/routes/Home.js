import style from "./Home.module.css";
import Detection from "../components/Detection";

function Home() {
    return (
        <div className={style.background}>
            <div>
                <h1 className={style.homeTitle}>퍼스널 컬러 진단기</h1>
                <Detection />
            </div>
        </div>
    );
}

export default Home;