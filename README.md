## Issue - gitlab

A nimbella commander that gives 'id', 'title', 'description' and 'author' of project if the 'issue' is under 'opened' state in gitlab. 

## Install 

```
/nc csm_install github:Nithishravindra/gitlab_nimbella
```

## Usuage

Grab an 'Personal Access Token' from [Gitlab](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html), then by using '/nc secret_create' add 'privateToken' in 'Name' and 'Personal Access Token' in 'Value'.

Run the following command to get issue details of project.
```
/dapp issue
```

## License

[MIT](LICENSE).
