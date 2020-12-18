import React from "react";
import styles from "./Dashboard.module.css";
import Api from '../../Services/Api';
import Loader from "../../Components/Loader";
import Tools from "../../Services/Tools";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this._API = new Api();

        this.state = {
            data: null,
            totals: null,
            item: null,
        }
    }

    componentDidMount() {
        this.loadAllData();
    }

    loadAllData = () => {
        this._API.ajax(`dashboard/data/0`, 'GET', {},
            (responce, request) => {
                let json = JSON.parse(responce) || {};
                // console.log('loadAllData', { json });
                this.setState({ ...json});
            }
        );
    }

    loadItem = (id) => {
        this._API.ajax(`dashboard/item/${id}`, 'GET', {},
            (responce, request) => {
                let json = JSON.parse(responce) || {};
                // console.log('loadItem', { id, json });
                this.setState({ ...json});
            }
        );
    }

    unloadItem = () => {
        this.setState({ item: null });
    }

    renderTotals = (totals) => {
        return Tools.mapObject(totals, (key, item, index) => {
            return (
                <div key={`${index}_${key}_${item}`}>
                    <b>{key}:</b><span> - {item}</span>
                </div>
            );
        });
    }

    renderData = (data) => {
        return (data || []).map((item, index) => {
            return (
                <div key={`${index}_${item.id}`}>
                    <b>ID:</b><span> - {item.id}</span><br/>
                    <b>Text:</b><span> - {item.text.substring(0,20)}...</span><br/>
                    <button onClick={() => this.loadItem(item.id)}>details</button>
                    <hr/>
                </div>
            );
        });
    }

    renderItem = (item) => {
        return (
            <div>
                <b>ID:</b><span> - {item.id}</span><br/>
                <b>Created:</b><span> - {item.created}</span><br/>
                <b>Important:</b><span> - {item.important === '1' ? 'Yes' : 'No'}</span><br/>
                <b>Text:</b><span> - {item.text}</span><br/>
                <button onClick={this.unloadItem}>close</button>
                <hr/>
            </div>
        );
    }

    render() {
        const { data, totals, item } = this.state;
        // console.log('Dashboard.render:', { data, totals });

        return (
            <div className={styles.dashboard}>

                <h1>Dashboard:</h1>
                <div className={styles.dashboardGrid}>

                    <div className={styles.totals}>
                        <h2>Totals:</h2>
                        <div>{
                            totals
                                ? this.renderTotals(totals)
                                : <Loader />
                        }</div>
                        <hr/>
                        <h2>Data:</h2>
                        <div>{
                            data
                                ? this.renderData(data)
                                : <Loader />
                        }</div>
                    </div>

                    <div className={styles.item}>
                        <h2>Item:</h2>
                        <div>
                            {
                                item
                                    ? this.renderItem(item)
                                    : <Loader />
                            }
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
