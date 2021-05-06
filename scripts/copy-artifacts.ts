
import {find,cp,mkdir} from 'shelljs'

const destDir = './apps/tx-builder/public/artifacts'
const artifactPaths = find('./node_modules/@perp/contract/build/contracts/src').filter(file => file.match(/[^(dbg)]\.json$/))
console.log(artifactPaths)

mkdir('-p', destDir)
cp(artifactPaths, destDir)