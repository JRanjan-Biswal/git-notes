## Reverting Changes

#### Undo Staged Changes (git add . not used yet)
1. Reversts all changes
    * git checkout . 
    * git restore .
2. Revert changs in file
    * git checkout <--filname-->
    * git restore <--filname-->

<br />

#### Undo Staged Changes (git add . has been used)
step 1.) git reset . || git reset <--filname--> <br />
step 2.) git restore <--filname--> || git restore .

<br />

#### Undo Commits
step 1.) git reset HEAD~<--num--> <br />
step 2.) git restore .

