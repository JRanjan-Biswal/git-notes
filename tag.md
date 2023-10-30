## Tagging
Tags are ref's that point to specific points in Git history. Tagging is generally used to capture a point in history that is used for a marked version release (i.e. v1.0.1). A tag is like a branch that doesn’t change. Unlike branches, tags, after being created, have no further history of commits. This document will cover the different kind of tags, how to create tags, listing all tags, deleting tags, sharing tags, and more.

[>> -- LEARN MORE ABOUT TAGS HERE (click here)  -- <<](https://www.atlassian.com/git/tutorials/inspecting-a-repository/git-tag)

[>> -- Lean About Semantic Versioning -- <<](https://semver.org/)

[>> -- Learn How To Manage Realeases -- <<](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)

<br />

### Creating a tag
```git tag <--tagname-->```

1. Replace `< tagname >` with a semantic identifier to the state of the repo at the time the tag is being created. A common pattern is to use version numbers like `git tag v1.4`
2. Git supports two different types of tags, `annotated` and `lightweight` tags. The previous example created a lightweight tag.
3. Lightweight tags and Annotated tags differ in the amount of accompanying meta data they store.
4. A `best practice` is to consider `Annotated tags as public`, and `Lightweight tags as private`. 
5. Annotated tags store extra meta data such as: the tagger name, email, and date. This is important data for a public release.
6. Lightweight tags are essentially 'bookmarks' to a commit, they are just a name and a pointer to a commit, useful for creating quick links to relevant commits.

<br />

### Annotated tags
1. Annotated tags are stored as full objects in the Git database.
2. To reiterate, They store extra meta data such as: the tagger name, email, and date. 
3. Similar to commits and commit messages Annotated tags have a tagging message. 
4. Similar to commits and commit messages Annotated tags have a tagging message. 
5. Suggested best practices for git tagging is to prefer annotated tags over lightweight so you can have all the associated meta-data.

```
                        git tag -a v1.4
```
note: Executing this above command will create a new annotated tag identified with v1.4. The command will then open up the configured default text editor to prompt for further meta data input.
```
                        git tag -a v1.4 -m "my version 1.4"
```
Note: 
1. Executing this command is similar to the previous invocation, however, this version of the command is passed the -m option and a message.
2. This is a convenience method similar to git commit -m that will immediately create a new tag and forgo opening the local text editor in favor of saving the message passed in with the -m option.

<br />

### Lightweight tags
```
                        git tag v1.4-lw
```
Executing this command creates a lightweight tag identified as `v1.4-lw`. Lightweight tags are created with the absence of the `-a`, `-s`, or `-m` options. Lightweight tags create a new tag checksum and store it in the `.git/` directory of the project's repo.

<br />

### Listing tags
To list stored tags in a repo execute the following:
```
                        git tag
```

<br />

### Sharing: Pushing tags to remote
Sharing tags is similar to pushing branches. By default, git push will not push tags. Tags have to be explicitly passed to git push.
```
                        git tag origin <--tag name-->
```
To push multiple tags simultaneously pass the `--tags` option to git push command. When another user clones or pulls a repo they will receive the new tags.

<br />

### Checking out tags
You can view the state of a repo at a tag by using the git checkout command.
```
                        git checkout v1.4
```
Note: 
`The above command will checkout the v1.4 tag. This puts the repo in a detached HEAD state. This means any changes made will not update the tag. They will create a new detached commit. This new detached commit will not be part of any branch and will only be reachable directly by the commits SHA hash. Therefore it is a best practice to create a new branch anytime you're making changes in a detached HEAD state.`

<br />

### Deleting tags
Deleting tags is a straightforward operation. Passing the -d option and a tag identifier to git tag will delete the identified tag.

```
                        git tag -d <--tagname-->
```




