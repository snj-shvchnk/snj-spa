import React from 'react'
import Loader from '../../Components/Loader'
import Api from '../../Services/Api'
import styles from './ApiDev.module.css'
import './ApiDev.css'

export default class ApiDev extends React.Component {
    constructor(props) {
        super(props);

        this.existingLinks = [
            'dashboard/data/0',
            'dashboard/item/2',
        ];

        this.state = {
            url: 'data/user/7',
            responce: '',
            loading: false,
        }
    }

    componentDidMount() {
        this.textarea.value = this.existingLinks.join('\n');
    }

    saveUrl = (e) => {
        this.setState({ url: e.target.value });
    }

    fetchApi = () => {
        if (this.state.loading) return;

        this.setState({ loading: true });
        const api = new Api();

        api.ajax( this.state.url, 'GET', {},
            (responce) => {
                this.setState({
                    responce: this.syntaxHighlight(responce), 
                    loading: false,
                });
            },
            (errCode, errText, errRequest) => {
                let errBody = this.syntaxHighlight({ errCode, errText, errRequest });
                this.setState({
                    responce: errBody, 
                    loading: false,
                });
            }
        );
    }

    syntaxHighlight = (json) => {
        if (typeof json != 'string') {
             json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    };

    render () {
        return (
            <div className={styles.apiDevWrapper}>
                <div>
                    <h1>API Development:</h1>
                    <div className={styles.devForm}>
                        <div className={styles.devInput}>
                            <input id="api-url-inp" type="text" value={this.state.url} onChange={this.saveUrl} />
                            &nbsp;
                            <button onClick={this.fetchApi}>FETCH</button>
                            <br/>
                            <br/>
                            Preview url:&nbsp; <b style={{ fontWeight: 'bold', color: '#333' }}>{this.state.url}</b>
                        </div>
                        <div className={styles.devArea}>
                            <textarea 
                                ref={(t) => { this.textarea = t; }}
                                className={styles.devWrapper} 
                            />
                        </div>
                    </div>
                    <hr/>
                </div>
                <div id="api-responce" className={styles.apiDevResponce}>
                    {
                        this.state.loading
                            ? <Loader />
                            : <div dangerouslySetInnerHTML={{ __html: this.state.responce }} />
                    }
                </div>
            </div>
        )
    }
}
