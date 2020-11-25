import * as R from 'ramda'
import { getPollComments } from '../../../logic/comments/comments.reducer'

const getChildren = (comments, parentId, level = 0) =>
  R.compose(
    R.flatten,
    R.map(comment => {
      const children = getChildren(comments, comment._id, level + 1)
      return [comment, ...children]
    }),
    R.sortBy(R.prop('date')),
    R.map(R.assoc('level', level)),
    R.filter(R.propEq('parentId', parentId))
  )(comments)

export const makePollComments = pollId => getChildren(getPollComments(pollId))
