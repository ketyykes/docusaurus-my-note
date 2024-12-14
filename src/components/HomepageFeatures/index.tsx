import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
	title: string;
	Svg: React.ComponentType<React.ComponentProps<"svg">>;
	description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
	{
		title: "學習筆記",
		Svg: require("@site/static/img/undraw_read_notes.svg").default,
		description: <>用 LLM 學習各種技術的筆記📝🚀</>,
	},
	{
		title: "實作筆記",
		Svg: require("@site/static/img/undraw_web_development.svg").default,
		description: <>實作各種技術的筆記🛠️💻</>,
	},
	{
		title: "文件翻譯",
		Svg: require("@site/static/img/undraw_learning.svg").default,
		description: <>把技術文件翻譯成繁體中文📚➡️📖</>,
	},
	{
		title: "工具推薦",
		Svg: require("@site/static/img/undraw_bookmarks.svg").default,
		description: <>將自己有用的工具紀錄並且分享🔨🔧</>,
	},
];

function Feature({ title, Svg, description }: FeatureItem) {
	return (
		<div className={clsx("col col--3")}>
			<div className="text--center">
				<Svg className={styles.featureSvg} role="img" />
			</div>
			<div className="text--center padding-horiz--md">
				<Heading as="h3">{title}</Heading>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures(): JSX.Element {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
