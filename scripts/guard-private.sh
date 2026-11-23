#!/bin/sh
# Fails if any tracked file looks like private content.
bad=$(git ls-files | grep -Ei '(^|/)private(/|-)|adviser-outreach|lawyer-questions|letter-to-city|legal-home|charter-working-draft|(^|/)templates\.md$|\.stl$|medal/' || true)
if [ -n "$bad" ]; then echo "Private files in public repo:"; echo "$bad"; exit 1; fi
