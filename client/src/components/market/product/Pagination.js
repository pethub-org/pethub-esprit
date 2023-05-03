import "./market.scss";

const Pagination = ({ page, total, limit, setPage }) => {
	const totalPages = Math.ceil(total / limit);

	const onClick = (newPage) => {
		setPage(newPage + 1);
	};

	return (
		<div className="pagination">
			{totalPages > 0 &&
				[...Array(totalPages)].map((val, index) => (
					<button
						onClick={() => onClick(index)}
						
						key={index}

					>
						<h1>{index + 1}</h1>
					</button>
				))}
		</div>
	);
};

export default Pagination;