import { useReducer, useState } from "react";
import ContentTitle from "../../components/ContentTitle";
import Team from "../../modes/Team";
import Errors from "../../modes/errors";
import { useNavigate } from "react-router-dom";
// import Team from "../../modes/Team";

export default function CreateTeamView() {
    const [errors, setErrors] = useState<Errors>({});
    const [{ team }, dispatch] = useReducer((state: { team: Team }, action: any): { team: Team } => {
        switch (action.type) {
            case "name": state.team.name = action.value; break;
            case "name_yomi": state.team.name_yomi = action.value; break;
            case "homepage_url": state.team.homepage_url = action.value; break;
            case "color_primary": state.team.color_primary = action.value; break;
            case "color_secondary": state.team.color_secondary = action.value; break;
        }
        return { team: state.team };
    }, { team: Team.empty() });
    // console.log(team);
    const navigate = useNavigate();
    const submit = async (team: Team) => {
        const e = team.validate(true);
        if (e) return setErrors(e);
        const result = await team.upsert();
        navigate(`/teams/${result.id}`);
    };
    return (
        <>
            <ContentTitle title="Create New Team" />

            <form style={{marginTop: 32}} className="row g-16 g-lg-16" noValidate={true}>

                {/* FIXME: styleを使わずに、g-12を指定することで間隙を作ることができるはず */}
                <div className="col-12 row" style={{ marginBottom: 12 }}>
                    <div className="col-md-8 row g-6 align-items-center">
                        <div className="col-md-12 text-md-start col-lg-4 text-lg-end">
                            <label htmlFor="team_name" className="form-label">チーム名</label>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <input
                                type="text"
                                className="form-control"
                                id="team_name"
                                placeholder=""
                                required={true}
                                name={"name"}
                                defaultValue={team.name}
                                onChange={(e) => dispatch({type: "name", value: e.target.value})}
                            />
                            <div className="invalid-feedback">{errors["name"]?.message ?? "このフィールドは必須です"}</div>
                        </div>
                    </div>
                </div>

                <div className="col-12 row" style={{ marginBottom: 12 }}>
                    <div className="col-md-8 row g-6 align-items-center">
                        <div className="col-md-12 text-md-start col-lg-4 text-lg-end">
                            <label htmlFor="team_name_yomi" className="form-label">チーム名読み（ひらがな）</label>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <input
                                type="text"
                                className="form-control"
                                id="team_name_yomi"
                                placeholder=""
                                required={true}
                                name={"name_yomi"}
                                defaultValue={team.name_yomi}
                                onChange={(e) => dispatch({type: "name_yomi", value: e.target.value})}
                            />
                            <div className="invalid-feedback">{errors["name_yomi"]?.message ?? "このフィールドは必須です"}</div>
                        </div>
                    </div>
                </div>

                <div className="col-12 row" style={{ marginBottom: 12 }}>
                    <div className="col-md-8 row g-6 align-items-center">
                        <div className="col-md-12 text-md-start col-lg-4 text-lg-end">
                            <label htmlFor="team_homepage_url" className="form-label">ホームページ</label>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <input
                                type="text"
                                className="form-control"
                                id="team_homepage_url"
                                placeholder="https://~"
                                required={true}
                                name={"homepage_url"}
                                defaultValue={team.homepage_url}
                                onChange={(e) => dispatch({type: "homepage_url", value: e.target.value})}
                            />
                            <div className="invalid-feedback">{errors["homepage_url"]?.message ?? "このフィールドは必須です"}</div>
                        </div>
                    </div>
                </div>

                <div className="col-12 row" style={{ marginBottom: 12 }}>
                    <div className="col-md-8 row g-6 align-items-center">
                        <div className="col-md-12 text-md-start col-lg-4 text-lg-end">
                            <label htmlFor="team_color_primary" className="form-label">カラーテーマ（その１）</label>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <input
                                type="color"
                                className="form-control form-control-color w-100"
                                id="team_color_primary"
                                required={true}
                                name={"team_color_primary"}
                                defaultValue={team.color_primary}
                                onChange={(e) => dispatch({type: "color_primary", value: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-12 row" style={{ marginBottom: 12 }}>
                    <div className="col-md-8 row g-6 align-items-center">
                        <div className="col-md-12 text-md-start col-lg-4 text-lg-end">
                            <label htmlFor="team_color_secondary" className="form-label">カラーテーマ（その２）</label>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <input
                                type="color"
                                className="form-control form-control-color w-100"
                                id="team_color_secondary"
                                required={true}
                                name={"team_color_secondary"}
                                defaultValue={team.color_secondary}
                                onChange={(e) => dispatch({type: "color_secondary", value: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                {/* <div className="col-12 row">
                    <div className="col-md-8 row g-6 align-items-center">
                        <div className="col-md-12 text-md-start col-lg-4 text-lg-end">
                            <label htmlFor="team_icon_image" className="form-label">アイコン画像</label>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <input
                                type="file"
                                className="form-control form-control-file w-100"
                                id="team_icon_image"
                                required={true}
                                name={"team_icon_image"}
                                onChange={(e) => {
                                    console.log(e.currentTarget.value);
                                    console.log(e.currentTarget.files?.item(0));
                                    const f = e.currentTarget.files?.item(0);
                                    dispatch({type: "icon_image", value: e.target.value})
                                }}
                            />
                            <div className="invalid-feedback">このフィールドは必須です</div>
                        </div>
                    </div>
                </div> */}

               <hr className="my-4" />

                <div className="col-12 row" style={{ marginBottom: 12 }}>
                    <div className="col align-self-end">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={async (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                document.querySelector("form")?.classList.add("was-validated");
                                await submit(team)
                            }}
                        >Send</button>
                    </div>
                </div>
            </form>
        </>
    );
}