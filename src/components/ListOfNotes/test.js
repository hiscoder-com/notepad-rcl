import React, { useState } from 'react';
import BookList from '../BookList';
import PropTypes from 'prop-types';
import { getBookNames, getBookData } from '../../core/Utils';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel } from '@material-ui/core';

function BibleBookList({
  labelForCheckbox,
  showCheckbox,
  showInactive,
  onClickBook,
  selectedBookId,
  titleOT,
  titleNT,
  titleOBS,
  availableBookList,
  titleBooks,
  BibleBookListClasses,
  bookClasses,
  testaments,
  sortFirstNT,
  showOBS,
}) {
  const [checkState, setCheckState] = useState(!showInactive);
  let bibleList;
  if (showOBS) {
    bibleList = getBookData(['nt', 'ot', 'obs']);
  } else {
    bibleList = getBookData(['nt', 'ot']);
  }
  let bibleBooks;
  if (showOBS) {
    bibleBooks = getBookNames(['nt', 'ot', 'obs']);
  } else {
    bibleBooks = getBookNames(['nt', 'ot']);
  }
  const currentBookList = bibleList.map((el) => {
    return {
      ...el,
      text: titleBooks[el.identifier] ?? bibleBooks[el.identifier],
      isset: availableBookList.includes(el.identifier),
    };
  });

  const currentBookListOT = currentBookList.filter((el) => el.categories === 'bible-ot');
  const currentBookListNT = currentBookList.filter((el) => el.categories === 'bible-nt');
  const currentBookListOBS = currentBookList.filter((el) => el.categories === 'obs');
  const handleChange = () => {
    setCheckState((prev) => !prev);
  };

  const allBooksIsSet = (bookList) => {
    const allBooks = bookList.filter((el) => el.isset === false);
    return allBooks.length > 0;
  };

  let testamentList = [];

  switch (testaments) {
    case 'nt':
      testamentList = [
        {
          title: titleNT,
          bookList: currentBookListNT,
        },
      ];
      if (showCheckbox) {
        showCheckbox = allBooksIsSet(currentBookListNT);
      }
      break;

    case 'ot':
      testamentList = [
        {
          title: titleOT,
          bookList: currentBookListOT,
        },
      ];
      if (showCheckbox) {
        showCheckbox = allBooksIsSet(currentBookListOT);
      }
      break;
    case 'all':
      testamentList = [
        { title: titleOT, bookList: currentBookListOT },
        { title: titleNT, bookList: currentBookListNT },
      ];
      if (sortFirstNT) {
        testamentList.reverse();
      }
      if (showCheckbox) {
        showCheckbox =
          allBooksIsSet(currentBookListOT) || allBooksIsSet(currentBookListNT);
      }
      break;

    default:
      break;
  }

  if (showOBS) {
    testamentList = testamentList.concat({
      title: titleOBS,
      bookList: currentBookListOBS,
    });
    if (!showCheckbox) {
      showCheckbox = allBooksIsSet(currentBookListOBS);
    }
  }

  const checkboxRender = showCheckbox ? (
    <FormControlLabel
      classes={{
        label: BibleBookListClasses?.label,
      }}
      control={<Checkbox checked={checkState} color="primary" onChange={handleChange} />}
      label={labelForCheckbox}
    />
  ) : (
    ''
  );
  const bookListRender = testamentList.map((el, index) => {
    return (
      <BookList
        bookClasses={bookClasses}
        bookList={el.bookList}
        bookListClasses={{
          title: BibleBookListClasses?.title,
          book: BibleBookListClasses?.book,
          bookList: BibleBookListClasses?.bookList,
        }}
        key={index}
        onClickBook={onClickBook}
        selectedBookId={selectedBookId}
        showInactive={!checkState}
        title={el.title}
      />
    );
  });

  return (
    <>
      {checkboxRender}
      {bookListRender}
    </>
  );
}

BibleBookList.defaultProps = {
  showCheckbox: true,
  showOBS: false,
  sortFirstNT: false,
  testaments: 'all',
  titleOT: '',
  titleNT: '',
  titleOBS: '',
  showInactive: true,
  onClickBook: (bookId) => {},
  labelForCheckbox: 'Show only existing books',
  titleBooks: {},
  availableBookList: [],
};

BibleBookList.propTypes = {
  testaments: PropTypes.oneOf(['all', 'nt', 'ot']),
  /** block header of "New Testament" */
  titleNT: PropTypes.string,
  /** block header of "OBS" */
  titleOBS: PropTypes.string,
  /** block header of "Old Testament" */
  titleOT: PropTypes.string,
  /** when true, show first New Testament, second - Old Testament */
  sortFirstNT: PropTypes.bool,
  /** array of existing bookId's */
  availableBookList: PropTypes.array,
  /** Array of bookId with the titles to be translated. If not set - get the default value in English */
  titleBooks: PropTypes.object,
  /** show or hide checkbox that show only existing books */
  showCheckbox: PropTypes.bool,
  /** show or hide OBS block */
  showOBS: PropTypes.bool,
  /** whether to display inactive books */
  showInactive: PropTypes.bool,
  /** label of checkbox */
  labelForCheckbox: PropTypes.string,
  /** object of className */
  BibleBookListClasses: PropTypes.shape({
    /** title className */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** book className */
    book: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** bookList className */
    bookList: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** className for label of checkbox */
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
  /** override the style of the Button mui component */
  bookClasses: PropTypes.object,
  /** an open book, a different style will be applied to it */
  selectedBookId: PropTypes.string,
  /** Event by clicking on the book. Receives a bookId at the entrance.  */
  onClickBook: PropTypes.func,
};

export default BibleBookList;
