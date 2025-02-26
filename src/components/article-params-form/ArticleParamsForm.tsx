import { useState, useRef, useEffect, FormEvent } from 'react';

import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import {
	contentWidthArr,
	OptionType,
	backgroundColors,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	isMenuOpen?: boolean;
	setArticleState: (value: ArticleStateType) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	isMenuOpen: isMenuOpenProp = false,
	setArticleState,
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(isMenuOpenProp);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleToggle = () => setIsMenuOpen((prev) => !prev);

	const handleChange =
		(fieldName: keyof ArticleStateType) => (value: OptionType) => {
			setFormState((prev: ArticleStateType) => ({
				...prev,
				[fieldName]: value,
			}));
		};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState(formState);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	return (
		<>
			<ArrowButton isMenuOpen={isMenuOpen} onClick={handleToggle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				onClick={(e) => e.stopPropagation()}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text uppercase weight={800} size={31}>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOption'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
