function calculateLeadScore(lead) {
  let score = 0;
  if (lead.source === 'Website') score += 20;
  if (lead.source === 'Referral') score += 30;
  if (lead.industry === 'IT') score += 10;
  return score;
}

module.exports = calculateLeadScore;
