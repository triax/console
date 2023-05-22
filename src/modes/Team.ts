import { Base } from "./base";
import Errors from "./errors";

export default class Team extends Base {
    static path = "teams";

    public name: string;
    public name_yomi: string;
    public icon_image_url?: string;
    public color_primary?: string;
    public color_secondary?: string;
    public homepage_url?: string;
    constructor({
        name, name_yomi,
        id,
        color_primary,
        color_secondary,
        homepage_url,
    }: {
        name: string;
        name_yomi: string;
        id?: string;
        color_primary?: string;
        color_secondary?: string;
        homepage_url?: string;
    }) {
        super(id);
        this.name = name;
        this.name_yomi = name_yomi;
        this.homepage_url = homepage_url;
        this.color_primary = color_primary;
        this.color_secondary = color_secondary;
    }

    public static empty(): Team {
        return new Team({
            name: "三菱商事 CLUB TRIAX", name_yomi: "みつびししょうじくらぶとらいあっくす",
            homepage_url: "https://www.triax.football/",
            color_primary: "#8b0101", color_secondary: "#2f2f2f"
        });
        // return new Team({ name: "", name_yomi: "", color_primary: "#8b0101", color_secondary: "#2f2f2f" });
    }

    override encode(): Record<string, any> {
        return {
            name: this.name,
            name_yomi: this.name_yomi,
            color_primary: this.color_primary,
            color_secondary: this.color_secondary,
            homepage_url: this.homepage_url,
            ...(this.id ? { id: this.id } : {}),
            ...(this.icon_image_url ? { icon_image_url: this.icon_image_url } : {}),
        };
    }
    override validate(): Errors | null {
        const errors: { [key: string]: { key: string; message: string; } } = {};
        try {
            new URL(this.homepage_url ?? "");
        } catch (e) {
            errors["homepage_url"] = { key: "homepage_url", message: "ホームページのURLが不正です" };
        }
        if (this.name.trim().length === 0) {
            errors["name"] = { key: "name", message: "チーム名を入力してください" };
        }
        if (this.name_yomi.trim().length === 0) {
            errors["name_yomi"] = { key: "name_yomi", message: "チーム名(よみ)を入力してください" };
        }
        return Object.keys(errors).length > 0 ? errors : null;
    }
}