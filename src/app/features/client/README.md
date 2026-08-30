# Client feature area

This directory is prepared for four independent business features:

- `personal-data` owns first and last names.
- `addresses` owns the address value.
- `emails` owns the email value.
- `phone` owns the phone value.

Each business feature is divided into `application`, `domain`, `infrastructure`,
`presentation`, and `state` layers. The top-level `presentation` directory is reserved for
page-level composition only; it does not own client business state or repositories.
