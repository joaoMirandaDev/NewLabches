import {
  ActionIcon,
  Avatar,
  Flex,
  Group,
  Header as MantineHeader,
  Menu,
  Sx,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { useActiveAuthProvider, useGetLocale, useLogout } from '@refinedev/core'
import { RefineThemedLayoutV2HeaderProps } from '@refinedev/mantine'
import { IconLanguage, IconLogout, IconMoonStars, IconSun } from '@tabler/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky,
}) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()
  const dark = colorScheme === 'dark'
  const borderColor = dark ? theme.colors.dark[6] : theme.colors.gray[2]
  const authProvider = useActiveAuthProvider()
  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  })

  const locale = useGetLocale()
  const currentLocale = locale()
  const { locales } = useRouter()

  let stickyStyles: Sx = {}
  if (sticky) {
    stickyStyles = {
      position: `sticky`,
      top: 0,
      zIndex: 1,
    }
  }

  return (
    <MantineHeader
      zIndex={199}
      height={64}
      py={6}
      px="sm"
      sx={{
        borderBottom: `1px solid ${borderColor}`,
        ...stickyStyles,
      }}
    >
      <Flex
        align="center"
        justify="end"
        sx={{
          height: '100%',
        }}
      >
        <Group>
          <Menu shadow="md">
            <Menu.Target>
              <ActionIcon variant="outline">
                <IconLanguage size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {[...(locales ?? [])].sort().map((lang: string) => (
                <Menu.Item
                  key={lang}
                  component={Link}
                  href="/"
                  locale={lang}
                  color={lang === currentLocale ? 'primary' : undefined}
                  icon={
                    <Avatar
                      src={`/images/flags/${lang}.svg`}
                      size={18}
                      radius="lg"
                    />
                  }
                >
                  {lang === 'pt' ? 'Português' : 'English'}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>

          <ActionIcon
            variant="outline"
            color={dark ? 'primary' : 'yellow'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
          <ActionIcon
            variant="outline"
            color="red"
            onClick={() => mutateLogout()}
            title="Sair"
          >
            <IconLogout size={18} />
          </ActionIcon>
        </Group>
      </Flex>
    </MantineHeader>
  )
}
