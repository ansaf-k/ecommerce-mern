import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page }) => {
    return (
        <>
            {pages > 1 && <Pagination>
                {[...Array(pages).keys()].map((x) => {
                    return (
                        <Pagination.Item
                            as={Link}
                            to={`/page/${x + 1}`}
                            active={x + 1 == page}
                            key={x}
                        >
                            {x + 1}
                        </Pagination.Item>
                    );
                })}
            </Pagination >}
        </>
    )
}

export default Paginate;