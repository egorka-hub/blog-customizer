import { useState, useEffect, CSSProperties } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

import '../../styles/index.scss';
import styles from './App.module.scss';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	useEffect(() => {
		Object.entries({
			'--font-family': articleState.fontFamilyOption.value,
			'--font-size': articleState.fontSizeOption.value,
			'--font-color': articleState.fontColor.value,
			'--container-width': articleState.contentWidth.value,
			'--bg-color': articleState.backgroundColor.value,
		}).forEach(([key, value]) => {
			document.documentElement.style.setProperty(key, value);
		});
	}, [articleState]);

	const articleStyles: CSSProperties = {
		'--font-family': articleState.fontFamilyOption.value,
		'--font-size': articleState.fontSizeOption.value,
		'--font-color': articleState.fontColor.value,
		'--container-width': articleState.contentWidth.value,
		'--bg-color': articleState.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={styles.main} style={articleStyles}>
			<ArticleParamsForm setArticleState={setArticleState} />
			<Article />
		</main>
	);
};
