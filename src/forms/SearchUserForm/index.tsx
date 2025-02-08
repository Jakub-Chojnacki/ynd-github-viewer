import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { SearchUserFormSchema, TSearchUserForm } from "./schema";
import { TSearchUserFormProps } from "./types";

const SearchUserForm = ({ setSearchTerm }: TSearchUserFormProps) => {
  const { control, handleSubmit } = useForm<TSearchUserForm>({
    resolver: zodResolver(SearchUserFormSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = (data: TSearchUserForm): void => {
    setSearchTerm(data.query);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="query"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Search GitHub users"
              variant="outlined"
              error={!!error}
              helperText={error?.message}
              sx={{ mb: 2 }}
            />
          )}
        />
        <Button type="submit" variant="contained">
          Search
        </Button>
      </form>
    </Container>
  );
};

export default SearchUserForm;
