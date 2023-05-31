import { LoaderFunction, useLoaderData, useNavigate } from "react-router-dom";
import ContentTitle from "../../components/ContentTitle";
import Team from "../../modes/Team";
import { useReducer, useState } from "react";
import Game from "../../modes/Game";
import Errors from "../../modes/errors";

export const loader: LoaderFunction = async () => {
    const teams = await Team.list();
    return { teams: teams.concat(Team.empty()) };
}

export default function CreateGameView() {
    const { teams } = useLoaderData() as { teams: Team[] };
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Errors | null>(null);
    const [{ game }, dispatch] = useReducer(({ game }: { game: Game }, action: any): { game: Game } => {
        switch (action.type) {
            case "kick_off": game.kick_off = new Date(action.value); break;
            case "game_set": game.game_set = new Date(action.value); break;
            case "venue": game.venue = action.value; break;
            case "home": game.home = teams.find((team) => team.id === action.value) ?? Team.empty(); break;
            case "visitor": game.visitor = teams.find((team) => team.id === action.value) ?? Team.empty(); break;
        }
        return { game };
    }, { game: Game.empty() });
    const submit = async (game: Game) => {
        const e = game.validate();
        if (e) return setErrors(e);
        await game.upsert();
        navigate("/games");
    }
    return (
        <>
            <ContentTitle title="Create New Game" />

            <form style={{marginTop: 32}} className="row g-16 g-lg-16" noValidate={true}>
                <div className="col-12 row" style={{ marginBottom: 12 }}>
                    {/* kick_off */}
                    <div className="col-md-8 row g-6 align-items-center">
                        <div className="col-md-12 text-md-start col-lg-4 text-lg-end">
                            <label htmlFor="game_kick_off" className="form-label">Kick Off</label>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="game_kick_off"
                                placeholder=""
                                required={true}
                                name={"kick_off"}
                                defaultValue={game.kick_off.toString()}
                                onChange={(e) => dispatch({type: "kick_off", value: e.target.value})}
                            />
                            <div className="invalid-feedback">{errors?.kick_off?.message ?? "このフィールドは必須です"}</div>
                        </div>
                    </div>
                    {/* game_set */}
                    <div className="col-md-8 row g-6 align-items-center">
                        <div className="col-md-12 text-md-start col-lg-4 text-lg-end">
                            <label htmlFor="game_set" className="form-label">Game Set</label>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="game_set"
                                placeholder=""
                                required={true}
                                name={"game_set"}
                                defaultValue={game.game_set.toString()}
                                onChange={(e) => dispatch({type: "game_set", value: e.target.value})}
                            />
                            <div className="invalid-feedback">{errors?.game_set?.message ?? "このフィールドは必須です"}</div>
                        </div>
                    </div>
                    {/* venue */}
                    <div className="col-md-8 row g-6 align-items-center">
                        <div className="col-md-12 text-md-start col-lg-4 text-lg-end">
                            <label htmlFor="game_venue" className="form-label">Venue</label>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <input
                                type="text"
                                className="form-control"
                                id="game_venue"
                                placeholder=""
                                required={true}
                                name={"venue"}
                                defaultValue={game.venue}
                                onChange={(e) => dispatch({type: "venue", value: e.target.value})}
                            />
                            <div className="invalid-feedback">{errors?.["venue"]?.message ?? "このフィールドは必須です"}</div>
                        </div>
                    </div>
                    {/* select home team */}
                    <div className="col-md-8 row g-6 align-items-center">
                        <div className="col-md-12 text-md-start col-lg-4 text-lg-end">
                            <label htmlFor="game_home" className="form-label">Home Team</label>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <select
                                className={"form-select " + (errors?.["home"]?.message ? "is-invalid" : "")}
                                id="game_home"
                                required={true}
                                name={"home"}
                                defaultValue={"__null__"}
                                onChange={(e) => dispatch({type: "home", value: e.target.value})}
                            >
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>
                            <div className="invalid-feedback">{errors?.["home"]?.message ?? "このフィールドは必須です"}</div>
                        </div>
                    </div>
                    {/* select visitor team */}
                    <div className="col-md-8 row g-6 align-items-center">
                        <div className="col-md-12 text-md-start col-lg-4 text-lg-end">
                            <label htmlFor="game_visitor" className="form-label">Visitor Team</label>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <select
                                className={"form-select " + (errors?.["visitor"] ? "is-invalid" : "")}
                                id="game_visitor"
                                required={true}
                                name={"visitor"}
                                defaultValue={"__null__"}
                                onChange={(e) => dispatch({type: "visitor", value: e.target.value})}
                            >
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>
                            <div className="invalid-feedback">{errors?.["visitor"]?.message ?? "このフィールドは必須です"}</div>
                        </div>
                    </div>

                    <hr className="col-md-8" />

                    {/* submit */}

                    <div className="col-md-8 row g-6 align-items-center">
                        <div className="col-md-12 text-md-start col-lg-4 text-lg-end"></div>
                        <div className="col-md-12 col-lg-8">
                            <button type="submit" className="btn btn-primary"
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    document.querySelector("form")?.classList.add("was-validated");
                                    await submit(game)
                                }}
                            >Create</button>
                            {errors ? <pre className="code"><code className="code">{JSON.stringify(errors, null, 1)}</code></pre> : null}
                        </div>
                    </div>

                </div>
            </form>
        </>
    );
}