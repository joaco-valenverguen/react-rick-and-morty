import Character from "./Character";

import React, { useEffect, useState } from "react";

function NavPage({ page, setPage }) {
	return (
		<header className="d-flex justify-content-between align-items-center">
			<p>Page: {page} </p>
			<div>
				{page > 1 && (
					<button
						className="btn btn-primary btn-sm me-2"
						onClick={() => setPage(page - 1)}
					>
						Page {page - 1}
					</button>
				)}

				{page < 42 && (
					<button
						className="btn btn-primary btn-sm"
						onClick={() => setPage(page + 1)}
					>
						Page {page + 1}
					</button>
				)}
			</div>
		</header>
	);
}

const CharacterList = () => {
	const [characters, setCharacters] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const response = await fetch(
				"https://rickandmortyapi.com/api/character/?page=" + page
			);
			const data = await response.json();
			console.log(data);
			setCharacters(data.results);
			setLoading(false);
		};

		fetchData();
	}, [page]);

	return (
		<div className="container">
			{loading ? (
				<div>Loading...</div>
			) : (
				<div className="row">
					<NavPage page={page} setPage={setPage} />
					{characters.map((character) => (
						<div className="col-md-4" key={character.id}>
							<Character
								character={character}
								key={character.id}
							/>
						</div>
					))}
					<NavPage page={page} setPage={setPage} />
				</div>
			)}
		</div>
	);
};

export default CharacterList;
