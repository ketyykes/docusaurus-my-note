import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<header
			className={clsx(
				"hero hero--primary",
				styles.heroBanner,
				styles.heroBannerBackground
			)}
		>
			<div className="container">
				<Heading
					as="h1"
					className={clsx(
						"hero__title",
						styles.backgroundOpacity,
						styles.textWhite
					)}
				>
					{siteConfig.title}
				</Heading>
				<p
					className={clsx(
						"hero__subtitle",
						styles.textWhite,
						styles.backgroundOpacity
					)}
				>
					{siteConfig.tagline}
				</p>
				<div className={styles.buttons}>
					<Link
						to="/docs/intro"
						className={clsx("button button--info button--lg")}
					>
						點我看介紹
					</Link>
				</div>
			</div>
		</header>
	);
}

export default function Home(): React.JSX.Element {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={`Hello from ${siteConfig.title}`}
			description="Description will go into a meta tag in <head />"
		>
			<HomepageHeader />
			<main>
				<HomepageFeatures />
			</main>
		</Layout>
	);
}
