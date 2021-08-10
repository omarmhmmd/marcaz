// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './objects/blockContent'
import essay from './documents/essay'
import author from './documents/author'
import social from './objects/social'
import imgCaption from './inline/imgCaption.js'
import youtube from './inline/youtube.js'


// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // Documents
    essay,
    author,
    // Objects
    blockContent,
		social,
		// Inline
		imgCaption,
		youtube
  ]),
})
