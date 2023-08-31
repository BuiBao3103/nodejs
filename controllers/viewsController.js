exports.getOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'overview'
  })
}
exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'tour'
  })
}