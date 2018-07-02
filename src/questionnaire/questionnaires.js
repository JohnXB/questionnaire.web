import React, {Component} from 'react';
import services from "../lib/services"
import {  Link} from "react-router-dom";
import {connect} from 'react-redux'
import "./questionnaires.css"

class QuestionnaireList extends Component {
    constructor(props) {
        super()
        this.state = {
            classification: [],
            questionnaires: []
        }


    }

    componentDidMount() {
        services.Questionnaire.GetClassfications().then(ret => {
            ret.data.data.push({id: "", name: "未分类"})
            this.setState({
                classification: ret.data.data
            })
        }).catch(ret => {
            console.log(ret)
        })
        services.Questionnaire.GetQuestionnaire("").then(ret => {

            this.setState({
                questionnaires: ret.data.data
            })
        })
    };

    getQuestionnaire = (i) => {
        services.Questionnaire.GetQuestionnaire(i).then(ret => {
            this.setState({
                questionnaires: ret.data.data
            })

        }).catch(ret => {
            console.log(ret)
        })
    }
    showQuestionnaire = (i) => {
        this.props.addQuestionnaireId(i)
    }
    render() {
        return (
            <div className="show_content" >
                <div className="left">
                    <div>
                        分类
                    </div>
                    {
                        this.state.classification.map((item, i) => {
                            return (
                                <a key={i} className="classification"
                                   onClick={() => this.getQuestionnaire(item.id)}>
                                    {item.name}
                                </a>
                            )
                        })
                    }
                </div>
                <div className="questionnaireList">
                    {
                        this.state.questionnaires.map((item, i) => {
                            return (
                                <div className="questionnaire" key={i}>
                                    <div style={{marginBottom:"30px"}}>
                                        <Link className="questionnaireTitle" to="/questionnaires/show"  onClick={() => this.showQuestionnaire(item.id)}>
                                            <span className="questionnaireTitle">{item.title}  </span>
                                        </Link>

                                        <span className="questionNum">共{item.questionCount}个问题</span>
                                        <div style={{fontSize:"16px"}}>简介：{item.description}</div>
                                    </div>

                                    <div>
                                        <span>作者：{item.creatorName }</span>
                                    </div>
                                </div>

                            )
                        })
                    }

                </div>
            </div>
        );
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addQuestionnaireId: (id) => {
            dispatch({
                type: 'ADD_QUESTIONNAIRE_ID',
                id: id

            })
        }
    }
}
export default connect(mapDispatchToProps)(QuestionnaireList);